"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Overview } from "@/components/Overview";
import { RecentActivities } from "@/components/RecentActivities";
import { Toaster } from "sonner";
import { getStudents } from "@/apis/studentService";

const MainDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null); // Replace with your data type

  useEffect(() => {
    // Fetch your data here
    const fetchData = async () => {
      try {
        // Simulate fetching data
        const response = await getStudents();
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    // fetchData();
  }, []);

  //   if (loading) {
  //     return <div>Loading...</div>; // You can replace this with a loading spinner
  //   }
  useEffect(() => {
    fetch("/api/start-consumer").catch(console.error);
  }, [1]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Toaster richColors position="top-right" />
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        {/* <Header /> */}
        <main className="flex-1 overflow-auto p-4">
          <h1 className="text-3xl font-bold">Main Dashboard</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {data.totalStudents} */}
                  4000
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4000</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {data.totalClasses} */}
                  5000
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {data.totalEnrollments}
                   */}
                  4000
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Overview />
          </div>
          <div className="mt-6">
            <RecentActivities />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
