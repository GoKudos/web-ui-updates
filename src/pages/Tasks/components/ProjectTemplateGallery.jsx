import {
  Modal,
  Avatar,
  Input,
  Radio,
  Checkbox,
  Popover,
  Collapse,
  Select,
  Button,
  Tabs,
  Table,
  Tag,
} from "@arco-design/web-react";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { TASK } from "@/constants";
import {
  IconInfoCircle,
  IconCaretRight,
  IconCaretUp,
  IconApps,
  IconArrowDown,
  IconCaretDown,
} from "@arco-design/web-react/icon";
import InputSelectMember from "./InputSelectMember";
import ProjectTemplate from "./ProjectTemplate";

const ProjectTemplateGallery = (props) => {
  const [avatarText, setAvatarText] = useState("A");
  const [avatarBg, setAvatarBg] = useState("gray");
  const [visibility, setVisibility] = useState("public");
  const [showAdvance, setShowAdvance] = useState(false);
  const selectedTemplate = "Default";
  const [modalProjectTemplate, setModalProjectTemplate] = useState(false);

  // const bgcolor = [];

  const groups = [
    {
      name: "Team",
      key: "team",
      templates: [
        {
          name: "Minutes",
          title: "Minutes: Add a Topic",
          groups: [
            {
              name: "Action Items",
              tasks: ["Task 1", "Task 2"]
            },
            {
              name: "Discussion",
              tasks: ["Topic 1", "Topic 2"]
            },
            {
              name: "References",
              tasks: ["Source 1", "Source 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
        {
          name: "Brainstorm",
          title: "Brainstorm: Add a Topic",
          groups: [
            {
              name: "Goals",
              tasks: ["Goal 1", "Goal 2"]
            },
            {
              name: "Inspiration",
              tasks: ["Inspiration 1", "Inspiration 2"]
            },
            {
              name: "Ideas",
              tasks: ["Idea 1", "Idea 2"]
            },
            {
              name: "Next Steps",
              tasks: ["Plan 1", "Plan 2"]
            },
          ],
          status: ["Avoid", "Consider", "Shortlist", "Proceed"],
          fields: ["Assignee"]
        },
        {
          name: "Weekly Updates (PPP)",
          title: "PPP: #year Week #number",
          groups: [
            {
              name: "Plans",
              tasks: ["Plan 1", "Plan 2"]
            },
            {
              name: "Progress",
              tasks: ["Progress 1", "Progress 2"]
            },
            {
              name: "Problems",
              tasks: ["Problem 1", "Problem 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
        {
          name: "Quarterly Review (OKR)",
          title: "OKR: #year Q#number",
          groups: [
            {
              name: "Objectives",
              tasks: ["Objective 1", "Objective 2"]
            },
            {
              name: "Key Results",
              tasks: ["Key Result 1", "Key Result 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Results"]
        },
        {
          name: "Project Product Plan",
          title: "Plan: Add a Project/Product Name",
          groups: [
            {
              name: "Objectives",
              tasks: ["Objective 1", "Objective 2"]
            },
            {
              name: "Milestones",
              tasks: ["Milestone 1", "Milestone 2"]
            },
            {
              name: "Budget",
              tasks: ["Budget 1", "Budget 2"]
            },
            {
              name: "Appendix",
              tasks: ["Appendix 1", "Appendix 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Budget value"]
        },
      ]
    },
    {
      name: "Personal",
      key: "personal",
      templates: [
        {
          name: "Weekly Planner",
          title: "Plan: #year Week #number",
          groups: [
            {
              name: "Monday",
              tasks: ["Todo 1", "Todo 2"]
            },
            {
              name: "Tuesday",
              tasks: ["Todo 1", "Todo 2"]
            },
            {
              name: "Wednesday",
              tasks: ["Todo 1", "Todo 2"]
            },
            {
              name: "Thursday",
              tasks: ["Todo 1", "Todo 2"]
            },
            {
              name: "Friday",
              tasks: ["Todo 1", "Todo 2"]
            },
            {
              name: "Saturday",
              tasks: ["Todo 1", "Todo 2"]
            },
            {
              name: "Sunday",
              tasks: ["Todo 1", "Todo 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Priority"]
        },
        {
          name: "Weekly Expenses",
          title: "Plan: #year Week #number",
          groups: [
            {
              name: "Monday",
              tasks: ["Food", "Wellness"]
            },
            {
              name: "Tuesday",
              tasks: ["Food", "Wellness"]
            },
            {
              name: "Wednesday",
              tasks: ["Food", "Wellness"]
            },
            {
              name: "Thursday",
              tasks: ["Food", "Wellness"]
            },
            {
              name: "Friday",
              tasks: ["Food", "Wellness"]
            },
            {
              name: "Saturday",
              tasks: ["Food", "Wellness"]
            },
            {
              name: "Sunday",
              tasks: ["Food", "Wellness"]
            },
          ],
          status: ["Needs", "Wants"],
          fields: ["Budget value", "Actual value"]
        },
      ]
    },
    {
      name: "Creative",
      key: "creative",
      templates: [
        {
          name: "Creative Brief",
          title: "Creative Brief: Add a Project Name",
          groups: [
            {
              name: "Description",
              tasks: ["Intro 1", "Intro 2"]
            },
            {
              name: "Objectives",
              tasks: ["Objective 1", "Objective 2"]
            },
            {
              name: "Audience",
              tasks: ["Audience 1", "Audience 2"]
            },
            {
              name: "Messaging",
              tasks: ["Look and feel", "Tone"]
            },
            {
              name: "Deliverables",
              tasks: ["Deliverable 1", "Deliverable 2"]
            },
            {
              name: "Budget",
              tasks: ["Budget 1", "Budget 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority", "Budget value", "Budget hours"]
        },
        {
          name: "Production Plan",
          title: "Production Plan: Add a Project Name",
          groups: [
            {
              name: "Overview",
              tasks: ["Intro 1", "Intro 2"]
            },
            {
              name: "Mood Board",
              tasks: ["Sample 1", "Sample 2"]
            },
            {
              name: "Budget",
              tasks: ["Budget 1", "Budget 2"]
            },
            {
              name: "Script",
              tasks: ["Script 1", "Script 2"]
            },
            {
              name: "Storyboard",
              tasks: ["Scene 1", "Scene 2"]
            },
            {
              name: "Music",
              tasks: ["Music 1", "Music 2"]
            },
            {
              name: "Footages",
              tasks: ["Video 1", "Video 2"]
            },
            {
              name: "Rough Cuts",
              tasks: ["Version 1", "Version 2"]
            },
            {
              name: "Final",
              tasks: ["Final"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority", "Budget value", "Budget hours"]
        },
      ]
    },
    {
      name: "Education",
      key: "education",
      templates: [
        {
          name: "Course Content",
          title: "Course: Add a Course Name",
          groups: [
            {
              name: "Chapter 1",
              tasks: ["Lesson 1", "Lesson 2"]
            },
            {
              name: "Chapter 2",
              tasks: ["Lesson 1", "Lesson 2"]
            },
            {
              name: "Chapter 3",
              tasks: ["Lesson 1", "Lesson 2"]
            },
            {
              name: "Chapter 4",
              tasks: ["Lesson 1", "Lesson 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
        {
          name: "Research Paper",
          title: "Research: Add a Topic",
          groups: [
            {
              name: "Abstract",
              tasks: ["Abstract 1", "Abstract 2"]
            },
            {
              name: "Methods",
              tasks: ["Method 1", "Method 2"]
            },
            {
              name: "Results",
              tasks: ["Result 1", "Result 2"]
            },
            {
              name: "Discussion",
              tasks: ["Discussion 1", "Discussion 2"]
            },
            {
              name: "References",
              tasks: ["Reference 1", "Reference 2"]
            },
            {
              name: "Appendix",
              tasks: ["Appendix 1", "Appendix 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
      ]
    },
    {
      name: "HR",
      key: "HR",
      templates: [
        {
          name: "New Recruit Onboarding",
          title: "New Recruit Onboarding",
          groups: [
            {
              name: "General",
              tasks: ["Background", "Mission & Vision", "Management"]
            },
            {
              name: "Checklist",
              tasks: ["Orientation", "Workstation", "Stationery"]
            },
            {
              name: "Forms",
              tasks: ["Leave Form", "Claim Form"]
            },
            {
              name: "Tools",
              tasks: ["GoKudos"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
        {
          name: "Job Vacancy",
          title: "Vacancy: Add a Position Name",
          groups: [
            {
              name: "Responsibles",
              tasks: ["Responsible 1", "Responsible 2"]
            },
            {
              name: "Requirements",
              tasks: ["Requirement 1", "Requirement 2"]
            },
            {
              name: "Perks",
              tasks: ["Basic Salary", "Allowances"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
      ]
    },
    {
      name: "IT",
      key: "IT",
      templates: [
        {
          name: "Asset Tracking",
          title: "Asset Tracking",
          groups: [
            {
              name: "Laptops",
              tasks: ["Laptop 1", "Laptop 2"]
            },
            {
              name: "Printers",
              tasks: ["Printer 1", "Printer 2"]
            },
            {
              name: "Licenses",
              tasks: ["License 1", "License 2"]
            },
            {
              name: "Domains",
              tasks: ["Domain1.com", "Domain2.com"]
            },
          ],
          status: ["New", "Used", "Damaged", "Scrapped"],
          fields: ["Due Date", "Assignee"]
        },
        {
          name: "IT Request",
          title: "IT Request",
          groups: [
            {
              name: "Software",
              tasks: ["Software 1", "Software 2"]
            },
            {
              name: "Hardware",
              tasks: ["Hardware 1", "Hardware 2"]
            },
            {
              name: "Network",
              tasks: ["Network 1", "Network 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
        {
          name: "Software Development",
          title: "Development: Add a Project Name",
          groups: [
            {
              name: "Planning",
              tasks: ["Objective", "Research"]
            },
            {
              name: "Design",
              tasks: ["Prototyping", "UI/UX"]
            },
            {
              name: "Development",
              tasks: ["Database", "Programming"]
            },
            {
              name: "Testing",
              tasks: ["Testing 1", "Testing 2"]
            },
            {
              name: "Deployment",
              tasks: ["Server 1", "Server 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
      ]
    },
    {
      name: "Marketing",
      key: "Marketing",
      templates: [
        {
          name: "Content Calendar",
          title: "Content Calendar: #year",
          groups: [
            {
              name: "January",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "February",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "March",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "April",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "May",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "June",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "July",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "August",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "September",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "October",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "November",
              tasks: ["Post 1", "Post 2"]
            },
            {
              name: "December",
              tasks: ["Post 1", "Post 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee"]
        },
        {
          name: "Brand Assets",
          title: "Brand: Add a Brand Name",
          groups: [
            {
              name: "Logo",
              tasks: ["Master Logo", "Logomark"]
            },
            {
              name: "Colour",
              tasks: ["Primary Colour", "Accent Colour"]
            },
            {
              name: "Typography",
              tasks: ["Title Font", "Body Font"]
            },
            {
              name: "Templates",
              tasks: ["Business Card", "Letterhead"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee"]
        },
        {
          name: "Marketing Campaign",
          title: "Campaign: Add a Campaign Name",
          groups: [
            {
              name: "Objectives",
              tasks: ["Objectives 1", "Objectives 2"]
            },
            {
              name: "Audiences",
              tasks: ["Audience 1", "Audience 2"]
            },
            {
              name: "Content",
              tasks: ["Copywriting", "Design"]
            },
            {
              name: "Channels",
              tasks: ["Search Engine", "Social Media"]
            },
            {
              name: "Budget",
              tasks: ["Budget 1", "Budget 2"]
            },
            {
              name: "Results",
              tasks: ["Impression", "Conversion"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee"]
        },
      ]
    },
    {
      name: "Sales",
      key: "Sales",
      templates: [
        {
          name: "Sales Pipeline",
          title: "Sales Pipeline",
          groups: [
            {
              name: "New Opportunities",
              tasks: ["Prospect 1", "Prospect 2"]
            },
            {
              name: "Active Opportunities",
              tasks: ["Prospect 1", "Prospect 2"]
            },
            {
              name: "Last Stage Opportunities",
              tasks: ["Prospect 1", "Prospect 2"]
            },
            {
              name: "Closed Won",
              tasks: ["Prospect 1", "Prospect 2"]
            },
            {
              name: "Closed Lost",
              tasks: ["Prospect 1", "Prospect 2"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee", "Priority"]
        },
        {
          name: "Sales Deck",
          title: "Sales Deck",
          groups: [
            {
              name: "Executive Summary",
              tasks: ["Problems", "Solutions"]
            },
            {
              name: "About Us",
              tasks: ["Background", "Mission & Vision", "Management"]
            },
            {
              name: "Product/Services",
              tasks: ["Feature 1", "Feature 2"]
            },
            {
              name: "Pricing",
              tasks: ["Plans", "Bundles"]
            },
            {
              name: "Call to Action",
              tasks: ["Why Us", "Free Consultation"]
            },
          ],
          status: ["Todo", "Doing", "Done", "KIV"],
          fields: ["Due Date", "Assignee"]
        },
      ]
    },
  ]

  const [showPreview, setShowPreview] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState(groups[0].templates[0])

  const bgcolor = ["bg-orange-100", "bg-green-100", "bg-cyan-100", "bg-blue-100", "bg-purple-100", "bg-pink-100", "bg-amber-100", "bg-lime-100", "bg-sky-100", "bg-violet-100", "bg-rose-100", "bg-yellow-100", "bg-emerald-100", "bg-indigo-100", "bg-fuchsia-100", "bg-slate-100", "bg-red-100", "bg-teal-100"]

  return (
    <>
      <Modal
        title="Project Templates"
        visible={props.visible}
        okText="Add Project"
        onOk={() => props.setVisible(false)}
        onCancel={() => props.setVisible(false)}
        autoFocus={false}
        focusLock={true}
        className="w-full max-w-3xl"
        footer={null}
      >
        {showPreview ? (
          <div className="-mx-5 -my-6">
            <div className="flex  px-4 py-2 border-b border-gray-200">
              <div className="flex-1">
                <span className="text-brand-500 cursor-pointer" onClick={() => setShowPreview(false)}>Back</span>
                <div className="font-bold text-lg">{previewTemplate.name}</div>
              </div>
              <div className="pt-2">
                <Button type="primary" onClick={() => setShowPreview(false)}>Use this template</Button>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-4">
              <div className="font-bold text-2xl font-heading">{previewTemplate.title}</div>
              {previewTemplate.groups.map(group => (
                <>
                  <div className="pt-4 pb-2 font-bold text-base font-heading"><IconCaretDown className="text-gray-500" /> {group.name}</div>
                  <div className="overflow-x-auto">
                    <table className="border-collapse border border-gray-200 w-full whitespace-nowrap table-fixed">
                      <thead>
                        <tr>
                          <th className="w-8 border-y border-gray-200 p-2 bg-gray-50"><Checkbox /></th>
                          <th className="w-40 border-y border-gray-200 p-2 bg-gray-50">Name</th>
                          <th className="w-20 border-y border-gray-200 p-2 bg-gray-50">Status</th>
                          {previewTemplate.fields.map(field => (
                            <th className="w-20 border-y border-gray-200 p-2 bg-gray-50">{field}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.tasks.map(task => (
                          <tr>
                            <td className="border-y border-gray-200 p-2"><Checkbox /></td>
                            <td className="border-y border-gray-200 p-2">{task}</td>
                            <td className="border-y border-gray-200 p-2"><Tag color="green" bordered className="w-full text-center">{previewTemplate.status[0]}</Tag></td>
                            {previewTemplate.fields.map(field => (
                              <td className="border-y border-gray-200 p-2">&nbsp;</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ))}
            </div>
          </div>

        ) : (
          <Tabs defaultActiveTab={groups[0].key}>
            {groups.map((group, group_index) => (
              <Tabs.TabPane key={group.key} title={group.name}>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {group.templates.map((template, template_index) => (
                    <div className="border border-gray-200 hover:border-gray-600 cursor-pointer" onClick={() => {
                      setShowPreview(true)
                      setPreviewTemplate(groups[group_index].templates[template_index])
                    }}>
                      <div className="p-2 font-bold text-lg">{template.name}</div>
                      <div className={`pt-4 pl-4 ${bgcolor[template_index]}`}>
                        <div className="bg-white border-t-8 border-l border-gray-200 pt-2 pl-4">
                          <div className="overflow-hidden text-2xl font-bold font-heading whitespace-nowrap">{template.title}</div>
                          <div className="pt-4 pb-2">{template.groups[0].name}</div>
                          <table className="border-collapse border border-gray-200 w-full">
                            <thead>
                              <tr>

                                <th className="w-2/4 border border-gray-200 bg-gray-50">&nbsp;</th>
                                <th className="w-1/4 border border-gray-200 bg-gray-50">&nbsp;</th>
                                <th className="w-1/4 border border-gray-200 bg-gray-50">&nbsp;</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>

                                <td className="border border-gray-200">&nbsp;</td>
                                <td className="border border-gray-200">&nbsp;</td>
                                <td className="border border-gray-200">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tabs.TabPane>
            )
            )}
          </Tabs>

        )}

      </Modal>
    </>
  );
};

export default ProjectTemplateGallery;
