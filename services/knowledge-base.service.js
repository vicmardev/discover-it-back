const config = require('config.json');
const db = require('database/db');
const Role = require('helpers/role');
const fs = require('fs');
module.exports = {
	createKnowledgeBaseNode,
	getKnowledgeBase,
	updateKnowledgeBaseNode,
	deleteKnowledgeBaseNode,
	createKnowledgeBaseEntry,
	updateKnowledgeBaseEntry,
};
//kb <- knowledge base

// Singleton that will store the knowledge base tree object
knowledgeBaseSingleton = undefined;
treeDiskSpaceMB = 0;
//used to upload all three types of files in loop
fileNameList = ['datasheetFile', 'troubleShootingFile', 'manualFile'];

async function createKnowledgeBaseEntry(body, files, params) {
	// validate if param nodes exist
	if (!files) throw `No files uploaded`;
	let id = 'KnowledgeBase,' + paramsToArray(params).toString() + ',' + body.name;
	if (await db.KnowledgeBaseNodes.findOne({_id: id})) {
		throw 'Node ID "' + id + '" already exist';
	}
	if (treeDiskSpaceMB > 50) throw 'No More Disk Space';
	let ancestors = await createMissingNodes(params);
	body._id = ancestors.slice(-1)[0] + ',' + body.name;
	body.ancestors = ancestors;
	body.parent = ancestors.slice(-1)[0];

	body.filepath = await uploadFile(files, body);
	const kbNode = new db.KnowledgeBaseNodes(body);
	// save equipment
	await kbNode.save();

	buildKnowledgeBase();

	return basicDetails(kbNode);
}

async function updateKnowledgeBaseEntry(body, files, params) {
	// validate if param nodes
	if (!files) throw `No files uploaded`;
	let id = 'KnowledgeBase,' + paramsToArray(params).toString() + ',' + body.name;
	const kbNode = await KnowledgeBaseNodeById(id);
	if (!kbNode) throw `No ${body.name} in path ${id} found`;
	if (treeDiskSpaceMB > 50) throw 'No More Disk Space';
	let ancestors = await createMissingNodes(params);

	body.ancestors = ancestors;
	body.parent = ancestors.slice(-1)[0];
	//save pdf if it exist
	body.filepath = await uploadFile(files, body);
	// copy body to account and save
	Object.assign(kbNode, body);
	await kbNode.save();
	//build tree with updated node
	buildKnowledgeBase();

	return basicDetails(kbNode);
}

function paramsToArray(params) {
	let array = [];
	for (key in params) {
		array.push(params[key]);
	}
	return array;
}

async function createMissingNodes(params) {
	let ancestors = ['KnowledgeBase'];
	let ancestorsRefs = [];
	for (let i = 0; i < Object.keys(params).length; i++) {
		const paramName = Object.keys(params)[i];
		const param = params[paramName];
		ancestorsRefs.push(ancestors.toString());
		ancestors.push(param);
		let parent = ancestorsRefs.slice(-1)[0];
		const ancestor = await db.KnowledgeBaseNodes.findOne({_id: ancestors.toString()});
		if (!ancestor) {
			const body = {
				_id: ancestors.toString(),
				name: param,
				type: paramName,
				ancestors: ancestorsRefs,
				parent: parent,
			};
			await new db.KnowledgeBaseNodes(body).save();
		}
	}
	ancestorsRefs.push(ancestors.toString());

	return ancestorsRefs;
}

async function createKnowledgeBaseNode(body, files) {
	// validate
	if (await db.KnowledgeBaseNodes.findOne({id: body.id})) {
		throw 'Node ID "' + body.name + '" already exist';
	}
	if (files) {
		body.filepath = await uploadFile(files, body);
	}

	body._id = body.name;
	const kbNode = new db.KnowledgeBaseNodes(body);
	// save equipment
	await kbNode.save();

	buildKnowledgeBase();

	return basicDetails(kbNode);
}

async function getKnowledgeBase() {
	//get tree if it already exist
	//build tree if not
	if (knowledgeBaseSingleton == undefined) {
		await buildKnowledgeBase();
	}

	return {tree: knowledgeBaseSingleton, sizeInMB: treeDiskSpaceMB};
}

async function buildKnowledgeBase() {
	const root = await db.KnowledgeBaseNodes.findOne({_id: 'KnowledgeBase'});
	knowledgeBaseSingleton = await buildtreePreorder(root);
	treeDiskSpaceMB = await getTreeDiskSpaceMB(root);
}

async function buildtreePreorder(root) {
	//if node is root, it initializes the tree
	let children = undefined;
	let kbChildrenDict = [];
	children = await db.KnowledgeBaseNodes.find({parent: root._id});

	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		kbChildrenDict.push({
			id: child._id,
			name: child.name,
			type: child.type,
		});
	}
	//Skips here if there are no more children, acts as stop condition
	for (let i = 0; i < children.length; i++) {
		child = children[i];
		//device is not a leaf node and has children
		if (child.type != 'Filepath')
			kbChildrenDict[i].children = await buildtreePreorder(child);
		else {
			kbChildrenDict[i].filepath = child.filepath;
		}
	}

	return kbChildrenDict;
}

async function getTreeDiskSpaceMB(root) {
	//if node is root, it initializes the tree
	let treeDiskSpaceMB = 0.0;
	let children = undefined;
	let kbChildrenDict = [];
	children = await db.KnowledgeBaseNodes.find({parent: root._id});

	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		kbChildrenDict.push({
			id: child._id,
			name: child.name,
			type: child.type,
		});
	}
	//Skips here if there are no more children, acts as stop condition
	for (let i = 0; i < children.length; i++) {
		child = children[i];
		//device is not a leaf node and has children
		if (child.type != 'Filepath') treeDiskSpaceMB += await getTreeDiskSpaceMB(child);
		else {
			kbChildrenDict[i].filepath = child.filepath;
			let stats = fs.statSync(child.filepath);
			let fileSizeInBytes = stats.size;
			let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
			//console.log(fileSizeInMegabytes);
			treeDiskSpaceMB += fileSizeInMegabytes;
		}
	}

	return treeDiskSpaceMB;
}

async function KnowledgeBaseNodeByName(name) {
	const kbNode = await db.KnowledgeBaseNodes.findOne({name: name});
	if (!kbNode) throw `node not found`;

	return kbNode;
}

async function KnowledgeBaseNodeById(id) {
	const kbNode = await db.KnowledgeBaseNodes.findOne({_id: id});
	if (!kbNode) throw `node not found`;

	return kbNode;
}

async function updateKnowledgeBaseNode(body, files) {
	const kbNode = await KnowledgeBaseNodeByName(body.name);
	if (!kbNode) throw `No ${body.name} found`;
	//save pdf if it exist
	//TODO: upload files
	if (files) {
		body.filepath = await uploadFile(files, body);
	}
	// copy body to account and save
	Object.assign(kbNode, body);
	await kbNode.save();
	//build tree with updated node
	buildKnowledgeBase();

	return basicDetails(kbNode);
}

async function deleteKnowledgeBaseNode(id) {
	const children = await db.KnowledgeBaseNodes.find({ancestors: id});
	let childrenNamesString = '';
	children.forEach(child => {
		childrenNamesString += ' ' + child._id;
	});
	if (children.length > 0 || children.name == 'KnowledgeBase')
		throw `cannot delete node ${id} with ${children.length} children`;

	const kbNode = await KnowledgeBaseNodeById(id);
	const parent = kbNode.parent;
	if (kbNode.filepath) deleteFile(kbNode.filepath);
	await kbNode.remove();
	const amountDeleted = await deleteParent(parent);
	//build tree without deleted node
	buildKnowledgeBase();
	return amountDeleted;
}

async function deleteParent(id) {
	if (id === 'KnowledgeBase') return 0;
	const children = await db.KnowledgeBaseNodes.find({ancestors: id});
	if (children.length > 0) return 0;
	const kbNode = await KnowledgeBaseNodeById(id);
	const parent = kbNode.parent;
	await kbNode.remove();
	return (await deleteParent(parent)) + 1;
}

async function deleteKnowledgeBaseEntry(params) {
	let id = 'KnowledgeBase,' + paramsToArray(params).toString();
	const kbNode = await KnowledgeBaseNodeById(id);
	await kbNode.remove();
	const ancestors = await db.KnowledgeBaseNodes.find({ancestors: id});
	let childrenNamesString = '';
	children.forEach(child => {
		childrenNamesString += ' ' + child.name;
	});

	//build tree without deleted node
	buildKnowledgeBase();
}

async function uploadFile(files, body) {
	let parentsDir = 'uploads';
	for (let i = 0; i < body.ancestors.length; i++) {}
	let dir = String(body.ancestors.slice(-1)[0]);
	dir = dir.replace(/,/g, '/');
	dir = dir.replace(/ /g, '');
	parentsDir += `/${dir}`;
	let file = files.fileUpload;
	let directory = `${parentsDir}/${body.name.replace(/ /g, '')}`;
	let filepath = `${directory}/${files.fileUpload.name.replace(/ /g, '')}`;
	saveFile(file, directory, filepath);
	return filepath;
}

function saveFile(file, fileDir, filepath) {
	if (!fs.existsSync(fileDir)) {
		fs.mkdirSync(fileDir, {recursive: true});
	}
	fs.writeFile(filepath, file.data, 'binary', function (err) {
		if (err) throw err;
	});
}

function deleteFile(filepath) {
	fs.unlinkSync(filepath);
}

async function getNode(name) {
	const kbNode = await db.KnowledgeBaseNodes.findById(name);
	if (!kbNode) throw `${name} node not found`;
	return kbNode;
}

function basicDetails(node) {
	const {_id, name, type, filepath, ancestors, parent} = node;
	return {
		_id,
		name,
		type,
		filepath,
		ancestors,
		parent,
	};
}
