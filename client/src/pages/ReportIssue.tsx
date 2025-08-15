import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { apiRequest } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";
import { MapPin, Camera, Award, Send, CheckCircle2, Upload } from "lucide-react";

const reportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  issueType: z.string().min(1, "Please select an issue type"),
  severity: z.string().min(1, "Please select severity level"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  suggestions: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  locationName: z.string().optional(),
  imageUrl: z.string().optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

const ReportIssue = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  // Toast is imported directly from sonner
  const queryClient = useQueryClient();

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      name: "",
      email: "",
      issueType: "",
      severity: "",
      description: "",
      suggestions: "",
      latitude: "",
      longitude: "",
      locationName: "",
      imageUrl: "",
    },
  });

  const reportMutation = useMutation({
    mutationFn: (data: ReportFormData) => 
      apiRequest("/api/reports", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          imageUrl: uploadedImageUrl || data.imageUrl,
        }),
      }),
    onSuccess: (response) => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboard"] });
      toast({
        title: "Report Submitted Successfully!",
        description: response.message || "Thank you for contributing to environmental monitoring!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          form.setValue("latitude", latitude.toString());
          form.setValue("longitude", longitude.toString());
          form.setValue("locationName", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsGettingLocation(false);
          toast({
            title: "Location Captured",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          setIsGettingLocation(false);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually if needed.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsGettingLocation(false);
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: ReportFormData) => {
    reportMutation.mutate({
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    });
  };

  // Handle image upload
  const handleGetUploadParameters = async () => {
    const response = await apiRequest("/api/objects/upload", { method: "POST" });
    return {
      method: "PUT" as const,
      url: response.uploadURL,
    };
  };

  const handleUploadComplete = (result: any) => {
    if (result.successful && result.successful.length > 0) {
      const uploadedFile = result.successful[0];
      // Extract object path from the upload URL
      const uploadURL = uploadedFile.uploadURL || "";
      if (uploadURL.includes("/uploads/")) {
        const objectId = uploadURL.split("/uploads/")[1].split("?")[0];
        const normalizedPath = `/objects/uploads/${objectId}`;
        setUploadedImageUrl(normalizedPath);
        form.setValue("imageUrl", normalizedPath);
        toast({
          title: "Image Uploaded",
          description: "Your image has been uploaded successfully!",
        });
      }
    }
  };

  const issueTypes = [
    { value: "water_pollution", label: "Water Pollution" },
    { value: "vegetation_loss", label: "Vegetation Loss" },
    { value: "soil_erosion", label: "Soil Erosion" },
    { value: "air_quality", label: "Air Quality Issues" },
    { value: "waste_disposal", label: "Improper Waste Disposal" },
    { value: "deforestation", label: "Deforestation" },
    { value: "wildlife_disturbance", label: "Wildlife Disturbance" },
    { value: "other", label: "Other Environmental Issue" },
  ];

  const severityLevels = [
    { value: "low", label: "Low - Minor concern" },
    { value: "medium", label: "Medium - Moderate impact" },
    { value: "high", label: "High - Significant concern" },
    { value: "critical", label: "Critical - Immediate action needed" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto text-center bg-card/80 backdrop-blur-sm border-2 border-secondary/20">
              <CardHeader>
                <div className="mx-auto mb-4 h-16 w-16 bg-secondary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-3xl text-foreground">Report Submitted Successfully!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for contributing to environmental monitoring. Your report helps make our communities healthier.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg p-6">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-secondary" />
                    <span className="text-xl font-semibold">+10 Points Earned!</span>
                  </div>
                  <p className="text-muted-foreground">
                    You've earned reward points for submitting this report. Check the leaderboard to see your ranking!
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsSubmitted(false)}
                    data-testid="button-submit-another"
                  >
                    Submit Another Report
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = "/leaderboard"}
                    data-testid="button-view-leaderboard"
                  >
                    View Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Report Environmental Issue
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us monitor and protect our environment by reporting issues in your area. 
              Your contribution makes a difference and earns you reward points!
            </p>
          </div>

          {/* Incentive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">Get 10 points for each report submitted</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-accent/20 to-accent/10 border-accent/20">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Make Impact</h3>
                <p className="text-sm text-muted-foreground">Your reports help officials take action</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Camera className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">See improvements made in your area</p>
              </CardContent>
            </Card>
          </div>

          {/* Report Form */}
          <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Submit Environmental Report</CardTitle>
              <CardDescription>
                Provide detailed information about the environmental issue you've observed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Issue Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="issueType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-issue-type">
                                <SelectValue placeholder="Select issue type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {issueTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
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
                      name="severity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-severity">
                                <SelectValue placeholder="Select severity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {severityLevels.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Location Information</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={getCurrentLocation}
                        disabled={isGettingLocation}
                        className="gap-2"
                        data-testid="button-get-location"
                      >
                        <MapPin className="h-4 w-4" />
                        {isGettingLocation ? "Getting Location..." : "Use Current Location"}
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name="locationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Enter location name or address" 
                              {...field} 
                              data-testid="input-location"
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a location name or use the button above to capture your current coordinates
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the environmental issue you observed in detail..."
                            className="min-h-[120px]"
                            {...field}
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormDescription>
                          Provide specific details about what you observed, when, and any immediate concerns
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <FormLabel>Add Photo (Optional)</FormLabel>
                    <div className="flex items-center gap-4">
                      <ObjectUploader
                        maxNumberOfFiles={1}
                        maxFileSize={10485760} // 10MB
                        onGetUploadParameters={handleGetUploadParameters}
                        onComplete={handleUploadComplete}
                        buttonClassName="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {uploadedImageUrl ? "Change Image" : "Upload Photo"}
                      </ObjectUploader>
                      {uploadedImageUrl && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Image uploaded successfully
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload a photo to help illustrate the environmental issue (JPG, PNG, max 10MB)
                    </p>
                  </div>

                  {/* Suggestions */}
                  <FormField
                    control={form.control}
                    name="suggestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suggestions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any suggestions for improvement or solutions..."
                            className="min-h-[80px]"
                            {...field}
                            data-testid="textarea-suggestions"
                          />
                        </FormControl>
                        <FormDescription>
                          Share any ideas you have for addressing this issue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={reportMutation.isPending}
                    data-testid="button-submit-report"
                  >
                    <Send className="h-4 w-4" />
                    {reportMutation.isPending ? "Submitting Report..." : "Submit Report"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportIssue;