import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  MapPin,
  Award,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalInternships: 0,
    matchedPairs: 0,
    pendingMatches: 0,
    avgMatchScore: 0,
    ruralRepresentation: 0,
    socialInclusion: 0,
    completionRate: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalStudents: 48250,
        totalInternships: 4875,
        matchedPairs: 42180,
        pendingMatches: 6070,
        avgMatchScore: 87.3,
        ruralRepresentation: 24.5,
        socialInclusion: 31.2,
        completionRate: 94.2
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      color: 'blue',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Available Internships',
      value: stats.totalInternships.toLocaleString(),
      icon: Building2,
      color: 'green',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Successful Matches',
      value: stats.matchedPairs.toLocaleString(),
      icon: CheckCircle,
      color: 'emerald',
      change: '+15.3%',
      changeType: 'positive'
    },
    {
      title: 'Pending Allocation',
      value: stats.pendingMatches.toLocaleString(),
      icon: Clock,
      color: 'orange',
      change: '-5.1%',
      changeType: 'negative'
    },
    {
      title: 'Avg Match Score',
      value: `${stats.avgMatchScore}%`,
      icon: TrendingUp,
      color: 'purple',
      change: '+2.4%',
      changeType: 'positive'
    },
    {
      title: 'Rural Representation',
      value: `${stats.ruralRepresentation}%`,
      icon: MapPin,
      color: 'teal',
      change: '+1.8%',
      changeType: 'positive'
    },
    {
      title: 'Social Inclusion',
      value: `${stats.socialInclusion}%`,
      icon: Award,
      color: 'indigo',
      change: '+3.2%',
      changeType: 'positive'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: Target,
      color: 'red',
      change: '+0.9%',
      changeType: 'positive'
    }
  ];

  const matchScoreData = [
    { score: '90-100%', count: 12500, percentage: 29.6 },
    { score: '80-89%', count: 15800, percentage: 37.5 },
    { score: '70-79%', count: 8900, percentage: 21.1 },
    { score: '60-69%', count: 4200, percentage: 10.0 },
    { score: '50-59%', count: 780, percentage: 1.8 }
  ];

  const sectorDistribution = [
    { name: 'IT/Software', value: 35, color: '#3b82f6' },
    { name: 'Finance/Banking', value: 18, color: '#10b981' },
    { name: 'Manufacturing', value: 15, color: '#f59e0b' },
    { name: 'Healthcare', value: 12, color: '#ef4444' },
    { name: 'Education', value: 8, color: '#8b5cf6' },
    { name: 'Other', value: 12, color: '#6b7280' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      emerald: 'bg-emerald-500 text-emerald-100',
      orange: 'bg-orange-500 text-orange-100',
      purple: 'bg-purple-500 text-purple-100',
      teal: 'bg-teal-500 text-teal-100',
      indigo: 'bg-indigo-500 text-indigo-100',
      red: 'bg-red-500 text-red-100'
    };
    return colors[color] || 'bg-gray-500 text-gray-100';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Real-time insights into the PM Internship allocation process
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="slide-up bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Match Score Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={matchScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="score" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value.toLocaleString(), 'Count']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sector Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {sectorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {sectorDistribution.map((sector, index) => (
              <div key={sector.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: sector.color }}
                ></div>
                <span className="text-sm text-gray-600">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Allocation Activity
        </h3>
        <div className="space-y-4">
          {[
            { student: 'Priya Sharma', company: 'TCS Mumbai', score: 94, time: '2 minutes ago' },
            { student: 'Rajesh Kumar', company: 'HDFC Bank Delhi', score: 91, time: '5 minutes ago' },
            { student: 'Anita Singh', company: 'Infosys Bangalore', score: 89, time: '8 minutes ago' },
            { student: 'Vikram Patel', company: 'Wipro Pune', score: 87, time: '12 minutes ago' },
            { student: 'Sunita Reddy', company: 'Tech Mahindra Hyderabad', score: 92, time: '15 minutes ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{activity.student}</p>
                <p className="text-sm text-gray-600">{activity.company}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{activity.score}%</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;