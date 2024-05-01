/* eslint-disable max-len */
import LocalizedStrings from "react-native-localization";

const translations = new LocalizedStrings({
  en: {
    inbox: "Inbox",
    projects: "Projects",
    tasks: "Tasks",
    addTask: "Add Task",
    editTask: "Edit Task",
    taskName: "Task Name",
    taskDescription: "Task Description",
    taskDue: "Task Due",
    taskPriority: "Task Priority",
    projectName: "Project Name",
    completeTaskSuccess: "Complete Task Success",
    unCompleteTaskSuccess: "UnComplete Task Success",
    completeTaskFailed: "Complete Task Failed",
    unCompleteTaskFailed: "UnComplete Task Failed",
    syncFailed: "Sync Failed",
    createProjectSuccess: "Create Project Success",
    createProjectFailed: "Create Project Failed",
    updateProjectSuccess: "Update Project Success",
    updateProjectFailed: "Update Project Failed",
    deleteProjectSuccess: "Delete Project Success",
    deleteProjectFailed: "Delete Project Failed",
    getProjectTasksFailed: "Get Project Tasks Failed",
    createTaskSuccess: "Create Task Success",
    createTaskFailed: "Create Task Failed",
    updateTaskSuccess: "Update Task Success",
    updateTaskFailed: "Update Task Failed",
    deleteTaskSuccess: "Delete Task Success",
    deleteTaskFailed: "Delete Task Failed",
  },
});

const LocalizationService = { translations };
export default LocalizationService;
