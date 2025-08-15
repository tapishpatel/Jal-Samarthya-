import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Droplets, 
  TreePine, 
  MapPin, 
  Users, 
  Target,
  CheckCircle,
  ArrowRight,
  Heart
} from "lucide-react";
import { Link } from "wouter";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-blue-950 dark:via-green-950 dark:to-blue-900">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-4">
                <Droplets className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              About Jal Samarthya
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Supporting the Namami Gange mission through community environmental monitoring 
              and river bank vegetation conservation
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TreePine className="h-4 w-4 mr-2" />
                Riparian Zone Protection
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Leaf className="h-4 w-4 mr-2" />
                Vegetation Monitoring
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Users className="h-4 w-4 mr-2" />
                Community Participation
              </Badge>
            </div>
          </div>

          {/* Namami Gange Project Overview */}
          <Card className="mb-12 bg-card/80 backdrop-blur-sm border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                The Namami Gange Project
              </CardTitle>
              <CardDescription className="text-base">
                India's flagship river conservation initiative
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Mission & Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Launched in 2014, Namami Gange is the Government of India's integrated 
                    conservation mission to restore the Ganga river. The project aims to rejuvenate 
                    the river by reducing pollution, conserving biodiversity, and maintaining 
                    ecological flow while ensuring community participation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      Effective abatement of pollution
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      Conservation and rejuvenation of river Ganga
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      Maintaining minimum ecological flows
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      Biodiversity conservation
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Riparian Zone Issues */}
          <Card className="mb-12 bg-card/80 backdrop-blur-sm border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-2">
                  <TreePine className="h-6 w-6 text-orange-600" />
                </div>
                Riparian Zone Vegetation Challenges
              </CardTitle>
              <CardDescription className="text-base">
                Understanding the critical issues affecting river bank ecosystems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-600">Historical Problems</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                        <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">Deforestation & Land Conversion</h4>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          Massive clearing of riparian forests for agriculture, urban development, 
                          and industrial projects, destroying critical habitat corridors.
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <h4 className="font-medium text-orange-800 dark:text-orange-400 mb-2">Invasive Species</h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          Introduction of non-native plants like Lantana camara and Prosopis juliflora 
                          disrupting native vegetation balance and ecosystem functions.
                        </p>
                      </div>
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">Pollution Impact</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          Industrial effluents, agricultural runoff, and urban waste affecting 
                          soil quality and native plant survival rates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Current Solutions</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Native Plantation Drives</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Systematic replanting of indigenous species like Salix, Ficus, Terminalia, 
                          and Bamboo to restore natural riparian ecosystems.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Community Involvement</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Training local communities in sustainable practices, organic farming, 
                          and traditional ecological knowledge preservation.
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">Scientific Monitoring</h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          Using satellite imagery, NDVI analysis, and ground surveys to track 
                          vegetation health and biodiversity recovery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What We Do */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-green-600" />
                  What We Do
                </CardTitle>
                <CardDescription>
                  Our role in supporting Namami Gange objectives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mt-1">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Vegetation Health Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Satellite monitoring to track river bank vegetation health 
                      and detect environmental changes early.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Community Engagement Platform</h4>
                    <p className="text-sm text-muted-foreground">
                      Digital platform for local communities to report environmental 
                      issues and participate in conservation efforts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mt-1">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Environmental Data Collection</h4>
                    <p className="text-sm text-muted-foreground">
                      Gathering field environmental data to support research 
                      and conservation decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-blue-600" />
                  How You Can Help
                </CardTitle>
                <CardDescription>
                  Ways to contribute to river conservation efforts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Report Environmental Issues</h4>
                    <p className="text-sm text-muted-foreground">
                      Submit reports about deforestation, pollution, invasive species, 
                      or vegetation stress in your area.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mt-1">
                    <TreePine className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Participate in Plantation Drives</h4>
                    <p className="text-sm text-muted-foreground">
                      Join community plantation initiatives and help plant native species 
                      along river banks and water bodies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 dark:bg-red-900 rounded-full p-2 mt-1">
                    <Users className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Spread Awareness</h4>
                    <p className="text-sm text-muted-foreground">
                      Educate others about the importance of riparian zones and encourage 
                      sustainable practices in your community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Join the Conservation Movement</h2>
              <p className="text-xl mb-6 opacity-90">
                Together, we can restore and protect India's precious river ecosystems
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/report">
                  <Button size="lg" variant="secondary" className="flex items-center gap-2" data-testid="button-report-issue">
                    <CheckCircle className="h-5 w-5" />
                    Submit Environmental Report
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/map">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" data-testid="button-explore-map">
                    <MapPin className="h-5 w-5 mr-2" />
                    Explore Monitoring Map
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;