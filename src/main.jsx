import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from './App'
import "@arco-design/web-react/dist/css/arco.css";
import "@/index.css";
import { ConfigProvider } from "@arco-design/web-react";
import enUS from "@arco-design/web-react/es/locale/en-US";

import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard/page";
import TasksLayout from "@/pages/Tasks/components/Layout";
import TasksTable from "@/pages/Tasks/Table";
import TasksKanban from "@/pages/Tasks/Kanban";
import TasksCalendar from "@/pages/Tasks/Calendar";
import TasksTimeline from "@/pages/Tasks/Timeline";
import TasksChart from "@/pages/Tasks/Chart";
import TasksBilling from "@/pages/Tasks/Billing";
import TasksBillingClaims from "@/pages/Tasks/BillingClaims";
import TasksBillingTimeCost from "@/pages/Tasks/BillingTimeCost";
import Contacts from "@/pages/Contacts/page";
import Attendance from "@/pages/Attendance/page";
import Reports from "@/pages/Reports/page";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={enUS}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/tasks" element={<TasksLayout />}>
            <Route index element={<TasksTable />} />
            <Route path="kanban" element={<TasksKanban />} />
            <Route path="calendar" element={<TasksCalendar />} />
            <Route path="timeline" element={<TasksTimeline />} />
            <Route path="chart" element={<TasksChart />} />
            <Route path="billing" element={<TasksBilling />} />
            <Route path="billing/claims" element={<TasksBillingClaims />} />
            <Route path="billing/timecost" element={<TasksBillingTimeCost />} />
          </Route>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);