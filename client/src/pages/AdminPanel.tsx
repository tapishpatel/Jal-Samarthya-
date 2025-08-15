import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { apiRequest } from "@/lib/queryClient";
import { Settings, FileText, CheckCircle, AlertTriangle, MapPin, Calendar, Camera, Plus } from "lucide-react";
import type { Report, Improvement } from "@shared/schema";

const improvementSchema = z.object({
  reportId: z.number().min(1, "Please select a report"),
  adminId: z.number().min(1, "Admin ID is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(1, "Location is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  workStarted: z.string().optional(),
  workCompleted: z.string().optional(),
});

type ImprovementFormData = z.infer<typeof improvementSchema>;

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("reports");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isAddingImprovement, setIsAddingImprovement] = useState(false);
  // Toast is imported directly from sonner
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading: reportsLoading } = useQuery<Report[]>({
    queryKey: ["/api/reports"],
  });

  const { data: improvements = [], isLoading: improvementsLoading } = useQuery<Improvement[]>({
    queryKey: ["/api/admin/improvements"],
  });

  const form = useForm<ImprovementFormData>({
    resolver: zodResolver(improvementSchema),
    defaultValues: {
      reportId: 0,
      adminId: 1, // Default admin ID
      title: "",
      description: "",
      location: "",
      latitude: "",
      longitude: "",
      workStarted: "",
      workCompleted: "",
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiRequest(`/api/reports/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
      toast({
        title: "Status Updated",
        description: "Report status has been updated successfully.",
      });
    },
  });

  const addImprovementMutation = useMutation({
    mutationFn: (data: ImprovementFormData) =>
      apiRequest("/api/admin/improvements", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          workStarted: data.workStarted ? new Date(data.workStarted).toISOString() : null,
          workCompleted: data.workCompleted ? new Date(data.workCompleted).toISOString() : null,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/improvements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
      setIsAddingImprovement(false);
      form.reset();
      toast({
        title: "Improvement Added",
        description: "Improvement work has been recorded successfully.",
      });
    },
  });

  const onSubmitImprovement = (data: ImprovementFormData) => {
    addImprovementMutation.mutate(data);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-secondary text-secondary-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "high": return "bg-destructive/80 text-destructive-foreground";
      case "critical": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-muted text-muted-foreground";
      case "in_progress": return "bg-accent text-accent-foreground";
      case "resolved": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Settings className="h-10 w-10" />
              Admin Panel
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage environmental reports, track improvements, and monitor community contributions
            </p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reports" className="gap-2">
                <FileText className="h-4 w-4" />
                Reports Management
              </TabsTrigger>
              <TabsTrigger value="improvements" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Improvements Tracking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Environmental Reports</h2>
                <Dialog open={isAddingImprovement} onOpenChange={setIsAddingImprovement}>
                  <DialogTrigger asChild>
                    <Button className="gap-2" data-testid="button-add-improvement">
                      <Plus className="h-4 w-4" />
                      Add Improvement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Record Improvement Work</DialogTitle>
                      <DialogDescription>
                        Document the improvement work done to address environmental issues
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitImprovement)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="reportId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Related Report</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-report">
                                    <SelectValue placeholder="Select a report" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {reports.map((report) => (
                                    <SelectItem key={report.id} value={report.id.toString()}>
                                      #{report.id} - {report.issueType.replace('_', ' ')} ({report.locationName})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Improvement Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief title of the improvement work" {...field} data-testid="input-improvement-title" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Work Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Detailed description of the improvement work performed..."
                                  className="min-h-[100px]"
                                  {...field}
                                  data-testid="textarea-improvement-description"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Work Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Location where work was performed" {...field} data-testid="input-improvement-location" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="workStarted"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Work Started</FormLabel>
                                <FormControl>
                                  <Input type="datetime-local" {...field} data-testid="input-work-started" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="workCompleted"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Work Completed</FormLabel>
                                <FormControl>
                                  <Input type="datetime-local" {...field} data-testid="input-work-completed" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            type="submit"
                            disabled={addImprovementMutation.isPending}
                            data-testid="button-save-improvement"
                          >
                            {addImprovementMutation.isPending ? "Saving..." : "Save Improvement"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddingImprovement(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              {reportsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Loading reports...</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {reports.map((report) => (
                    <Card key={report.id} className="bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Report #{report.id} - {report.issueType.replace('_', ' ')}
                            </h3>
                            <div className="flex gap-2 mb-2">
                              <Badge className={getSeverityColor(report.severity)}>
                                {report.severity}
                              </Badge>
                              <Badge className={getStatusColor(report.status)}>
                                {report.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Select
                              onValueChange={(status) => 
                                updateStatusMutation.mutate({ id: report.id, status })
                              }
                              defaultValue={report.status}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Reporter</p>
                            <p className="font-medium">{report.name} ({report.email})</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Location
                            </p>
                            <p className="font-medium">{report.locationName || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Submitted
                            </p>
                            <p className="font-medium">{report.createdAt ? formatDate(report.createdAt) : 'N/A'}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Description</p>
                            <p className="text-sm">{report.description}</p>
                          </div>
                          {report.suggestions && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Suggestions</p>
                              <p className="text-sm text-muted-foreground">{report.suggestions}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {reports.length === 0 && (
                    <Card className="bg-card/80 backdrop-blur-sm">
                      <CardContent className="text-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No reports submitted yet</h3>
                        <p className="text-muted-foreground">
                          Reports will appear here as community members submit environmental issues.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="improvements" className="space-y-6">
              <h2 className="text-2xl font-semibold">Improvement Work Tracking</h2>
              
              {improvementsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Loading improvements...</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {improvements.map((improvement) => (
                    <Card key={improvement.id} className="bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{improvement.title}</h3>
                            <Badge variant="secondary">
                              Report #{improvement.reportId}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {improvement.workCompleted ? 'Completed' : 'In Progress'}
                            </p>
                            {improvement.workCompleted && (
                              <p className="text-sm font-medium">
                                {formatDate(improvement.workCompleted.toString())}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Location
                            </p>
                            <p className="font-medium">{improvement.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Work Period
                            </p>
                            <p className="font-medium">
                              {improvement.workStarted && formatDate(improvement.workStarted.toString())}
                              {improvement.workStarted && improvement.workCompleted && ' - '}
                              {improvement.workCompleted && formatDate(improvement.workCompleted.toString())}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Work Description</p>
                          <p className="text-sm">{improvement.description}</p>
                        </div>

                        {improvement.proofImages && (
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                              <Camera className="h-4 w-4" />
                              Proof of Work
                            </p>
                            <div className="text-sm text-muted-foreground">
                              Proof images available (feature to be implemented)
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {improvements.length === 0 && (
                    <Card className="bg-card/80 backdrop-blur-sm">
                      <CardContent className="text-center py-12">
                        <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No improvements recorded yet</h3>
                        <p className="text-muted-foreground">
                          Improvement work will be tracked here as issues are addressed.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;