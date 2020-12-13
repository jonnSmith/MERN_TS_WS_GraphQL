import * as SharedModels from "@shared/models"

const DEFAULT_WORKSPACE: { workspace: SharedModels.IWorkspaceModel} = { workspace: { name: undefined } }
const DEFAULT_USER: { user: SharedModels.IUserModel} = { user: { ...{ email: undefined, workspaceId: undefined },...DEFAULT_WORKSPACE} }
const DEFAULT_USER_DATA = { ...DEFAULT_USER, ...{ code: undefined }};
const DEFAULT_LIST = { list: [] };
const DEFAULT_MESSAGE: { message: SharedModels.IMessageModel} = { message: { text: undefined } };

export {DEFAULT_MESSAGE, DEFAULT_USER, DEFAULT_USER_DATA, DEFAULT_LIST, DEFAULT_WORKSPACE};
