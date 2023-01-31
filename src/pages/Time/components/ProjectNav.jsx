// import { displayTasksBy } from "../utils/_utils";
import { Select, Radio, Button, DatePicker } from "@arco-design/web-react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";
import dayjs from "dayjs";
import { useState } from "react";

const ProjectNav = (props) => {
  const [approve, setApprove] = useState(false);
  return (
    <>
      <div className="flex items-center h-12 border-y border-gray-300 px-2">
        <div className="flex-1">
          <Button
            size="small"
            type="link"
            className="p-0"
            onClick={() => {
              props.setSelected(props.selected.subtract(1, "month"));
            }}
          >
            <IconLeft className="text-gray-400 ml-1" />
          </Button>
          <DatePicker.MonthPicker
            defaultPickerValue={props.selected}
            value={props.selected}
            triggerElement={
              <Button size="small" type="link">
                <span className="text-gray-900 text-base font-heading">
                  {props.selected.format("MMMM YYYY")}
                </span>
              </Button>
            }
            onChange={(e) => {
              // console.log(dayjs(e));
              props.setSelected(dayjs(e));
            }}
          />
          <Button
            size="small"
            type="link"
            className="p-0"
            onClick={() => {
              props.setSelected(props.selected.add(1, "month"));
            }}
          >
            <IconRight className="text-gray-400 ml-1" />
          </Button>
        </div>
        <div>
          <Select
            value={props.view}
            onChange={(e) => {
              props.setView(e);
            }}
          >
            <Select.Option value="group">Group</Select.Option>
            <Select.Option value="member">Member</Select.Option>
          </Select>
          {/* {approve ? (
            <Button type="primary" size="small">
              Invoice
            </Button>
          ) : (
            <Button type="primary" size="small" onClick={() => setApprove(true)}>
              Approve
            </Button>
          )} */}
        </div>
        <div className="ml-1">
          <Button type="primary" size="small">
            Export
          </Button>
        </div>
      </div>
    </>
  );
};
export default ProjectNav;
