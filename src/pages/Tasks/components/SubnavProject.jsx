import { Menu, Button, Dropdown } from "@arco-design/web-react";
import {
  IconFolder,
  IconPlus,
  IconSort,
  IconMore,
  IconMoreVertical,
  IconApps,
} from "@arco-design/web-react/icon";
import { Link } from "react-router-dom";
import { projectsData } from "@/pages/Tasks/utils/sample_data";
import WorkspaceAdd from "./WorkspaceAdd";
import WorkspaceDelete from "./WorkspaceDelete";
import ProjectAdd from "./ProjectAdd";
import ProjectDelete from "./ProjectDelete";
import ProjectTemplateGallery from "./ProjectTemplateGallery";
import ProjectMove from "./ProjectMove";
import ProjectDuplicate from "./ProjectDuplicate";
import { useState } from "react";

const SubnavProject = () => {
  const [modalWorkspace, setModalWorkspace] = useState(false);
  const [modalWorkspaceDelete, setModalWorkspaceDelete] = useState(false);
  const [modalProject, setModalProject] = useState(false);
  const [modalProjectDelete, setModalProjectDelete] = useState(false);
  const [modalProjectTemplate, setModalProjectTemplate] = useState(false);
  const [modalProjectMove, setModalProjectMove] = useState(false);
  const [modalProjectDuplicate, setModalProjectDuplicate] = useState(false);

  const menuWorkspace = (
    <Menu>
      <Menu.Item key="1" onClick={() => setModalWorkspace(true)}>
        Edit workspace
      </Menu.Item>
      <hr />
      <Menu.Item key="2">
        <Link to="/tasks/archivedprojects" className="flex-1">
          View archived projects
        </Link>
      </Menu.Item>
      <hr />
      <Menu.Item key="4" onClick={() => setModalWorkspaceDelete(true)}>
        Delete workspace
      </Menu.Item>
    </Menu>
  );

  const menuProject = (
    <Menu>
      <Menu.Item key="1" onClick={() => setModalProject(true)}>
        Edit project
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setModalProjectMove(true)}>
        Move project
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setModalProjectDuplicate(true)}>
        Duplicate project
      </Menu.Item>
      <hr />
      <Menu.Item key="4">
        <Link to="/tasks/archived" className="flex-1">
          View archived tasks
        </Link>
      </Menu.Item>
      <hr />
      <Menu.Item key="5" onClick={() => setModalProjectDelete(true)}>
        Delete project
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Menu selectedKeys="1" className="bg-gray-100">
        {/* <Menu.Item
          className="text-base"
          style={{ padding: 0 }}
          onClick={() => setModalProject(true)}
        >
          <div className="bg-gray-100 hover:bg-gray-200">
            <IconPlus className="w-4 h-4 ml-2" /> Add Project
          </div>
        </Menu.Item> */}
        <Menu.Item className="text-base" style={{ padding: 0 }}>
          <div className="bg-gray-100 hover:bg-gray-200 pl-2 flex items-center">
            <Link to="/tasks/workspace" className="flex-1">
              All projects
            </Link>
            <Dropdown droplist={menuWorkspace} trigger="click">
              <div className="-mr-4 px-1">
                <IconMoreVertical className="h-4 w-4" />
              </div>
            </Dropdown>
          </div>
        </Menu.Item>
      </Menu>
      <div className="px-2">
        <Button
          long
          type="outline"
          size="small"
          icon={<IconPlus className="w-3 h-3 ml-2" />}
          onClick={() => setModalProject(true)}
        >
          Add Project
        </Button>
        <Button
          long
          type="text"
          size="small"
          className="text-gray-600"
          // icon={<IconApps className="w-3 h-3 ml-2" />}
          onClick={() => setModalProjectTemplate(true)}
        >
          Project Templates
        </Button>
      </div>
      <hr className="my-2" />
      <div className="flex-grow overflow-y-auto">
        <Menu selectedKeys="1" className="bg-gray-100">
          {projectsData.map((project) => (
            <Menu.Item
              key={project.id}
              className="text-base"
              style={{ padding: 0 }}
            >
              <div className="flex items-center bg-gray-100 hover:bg-gray-200">
                <Link to="/tasks" key={project.id} className="flex-1">
                  <div>
                    <IconFolder className="w-4 h-4 ml-2" /> {project.name}
                  </div>
                </Link>
                <Dropdown droplist={menuProject} trigger="click">
                  <div className="-mr-4 px-1">
                    <IconMoreVertical className="h-4 w-4" />
                  </div>
                </Dropdown>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <WorkspaceAdd visible={modalWorkspace} setVisible={setModalWorkspace} />
      <WorkspaceDelete
        visible={modalWorkspaceDelete}
        setVisible={setModalWorkspaceDelete}
      />
      <ProjectAdd visible={modalProject} setVisible={setModalProject} />
      <ProjectDelete
        visible={modalProjectDelete}
        setVisible={setModalProjectDelete}
      />
      <ProjectTemplateGallery
        visible={modalProjectTemplate}
        setVisible={setModalProjectTemplate}
      />
      <ProjectMove
        visible={modalProjectMove}
        setVisible={setModalProjectMove}
      />
      <ProjectDuplicate
        visible={modalProjectDuplicate}
        setVisible={setModalProjectDuplicate}
      />
    </>
  );
};
export default SubnavProject;
