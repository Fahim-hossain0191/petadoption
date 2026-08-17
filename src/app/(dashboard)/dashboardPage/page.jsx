import { redirect } from "next/navigation";

const DashboardPage = () => {
  redirect("/myRequests");
};

export default DashboardPage;