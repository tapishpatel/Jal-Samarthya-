import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Star, TrendingUp, Users, Target } from "lucide-react";
import type { User } from "@shared/schema";

const Leaderboard = () => {
  const { data: leaderboard = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/leaderboard"],
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">Champion</Badge>;
      case 2:
        return <Badge className="bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900">Runner-up</Badge>;
      case 3:
        return <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-amber-900">Third Place</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (username: string) => {
    return username.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const achievements = [
    {
      title: "Environmental Guardian",
      description: "Submit 10+ reports",
      icon: <Target className="h-6 w-6 text-secondary" />,
      threshold: 10,
    },
    {
      title: "Community Hero",
      description: "Submit 25+ reports",
      icon: <Users className="h-6 w-6 text-accent" />,
      threshold: 25,
    },
    {
      title: "Eco Champion",
      description: "Submit 50+ reports",
      icon: <Trophy className="h-6 w-6 text-primary" />,
      threshold: 50,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
            </div>
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
              Community Leaderboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating our environmental champions who are making a difference through community reporting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Leaderboard */}
            <div className="lg:col-span-2">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Contributors
                  </CardTitle>
                  <CardDescription>
                    Rankings based on reward points earned through environmental reporting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {leaderboard.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No contributors yet</h3>
                      <p className="text-muted-foreground">
                        Be the first to submit an environmental report and earn your place on the leaderboard!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leaderboard.map((user, index) => {
                        const rank = index + 1;
                        return (
                          <div
                            key={user.id}
                            className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                              rank <= 3 
                                ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20' 
                                : 'bg-muted/20 border-border'
                            }`}
                            data-testid={`leaderboard-entry-${rank}`}
                          >
                            {/* Rank */}
                            <div className="flex items-center justify-center w-12 h-12">
                              {rank <= 3 ? (
                                getRankIcon(rank)
                              ) : (
                                <span className="text-xl font-bold text-muted-foreground">#{rank}</span>
                              )}
                            </div>

                            {/* Avatar */}
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                                {getInitials(user.username)}
                              </AvatarFallback>
                            </Avatar>

                            {/* User Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg" data-testid={`username-${rank}`}>
                                  {user.username}
                                </h3>
                                {getRankBadge(rank)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span data-testid={`reports-count-${rank}`}>
                                  {user.reportsSubmitted} reports submitted
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span data-testid={`reward-points-${rank}`}>
                                    {user.rewardPoints} points
                                  </span>
                                </span>
                              </div>
                            </div>

                            {/* Achievement Badges */}
                            <div className="flex gap-1">
                              {achievements
                                .filter(achievement => user.reportsSubmitted >= achievement.threshold)
                                .map((achievement, achIndex) => (
                                  <div 
                                    key={achIndex}
                                    className="p-1 rounded-full bg-primary/10"
                                    title={achievement.title}
                                  >
                                    {achievement.icon}
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Achievements Sidebar */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Unlock badges by contributing to environmental monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card/50">
                      {achievement.icon}
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/20 to-accent/10 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg">How Points Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Submit Report:</span>
                    <span className="font-semibold">+10 points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Report:</span>
                    <span className="font-semibold">+5 bonus</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issue Resolved:</span>
                    <span className="font-semibold">+20 points</span>
                  </div>
                  <div className="pt-2 border-t border-accent/20">
                    <p className="text-muted-foreground">
                      The more you contribute, the more impact you make on environmental protection!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;