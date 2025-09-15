import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Award,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  ScatterChart, Scatter, ComposedChart
} from 'recharts';

const Analytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const timeRangeData = [
    { month: 'Jan', matches: 1200, avgScore: 82, ruralRep: 23, socialInc: 29 },
    { month: 'Feb', matches: 1450, avgScore: 84, ruralRep: 25, socialInc: 31 },
    { month: 'Mar', matches: 1680, avgScore: 86, ruralRep: 26, socialInc: 32 },
    { month: 'Apr', matches: 1890, avgScore: 87, ruralRep: 27, socialInc: 33 },
    { month: 'May', matches: 2100, avgScore: 88, ruralRep: 28, socialInc: 34 },
    { month: 'Jun', matches: 2350, avgScore: 89, ruralRep: 29, socialInc: 35 }
  ];

  const sectorDistribution = [
    { name: 'IT/Software', count: 2730, percentage: 35, color: '#3b82f6' },
    { name: 'Finance/Banking', count: 1404, percentage: 18, color: '#10b981' },
    { name: 'Manufacturing', count: 1170, percentage: 15, color: '#f59e0b' },
    { name: 'Healthcare', count: 936, percentage: 12, color: '#ef4444' },
    { name: 'Education', count: 624, percentage: 8, color: '#8b5cf6' },
    { name: 'Other', count: 936, percentage: 12, color: '#6b7280' }
  ];

  const geographicDistribution = [
    { state: 'Maharashtra', count: 1560, percentage: 20 },
    { state: 'Karnataka', count: 1326, percentage: 17 },
    { state: 'Tamil Nadu', count: 1170, percentage: 15 },
    { state: 'Delhi', count: 1092, percentage: 14 },
    { state: 'Telangana', count: 780, percentage: 10 },
    { state: 'West Bengal', count: 624, percentage: 8 },
    { state: 'Gujarat', count: 546, percentage: 7 },
    { state: 'Others', count: 702, percentage: 9 }
  ];

  const scoreTrends = [
    { week: 'Week 1', score: 78, matches: 1200 },
    { week: 'Week 2', score: 82, matches: 1450 },
    { week: 'Week 3', score: 85, matches: 1680 },
    { week: 'Week 4', score: 87, matches: 1890 },
    { week: 'Week 5', score: 89, matches: 2100 },
    { week: 'Week 6', score: 91, matches: 2350 }
  ];

  const universityPerformance = [
    { university: 'IIT Delhi', avgScore: 94, matches: 450, students: 500 },
    { university: 'IIT Mumbai', avgScore: 93, matches: 420, students: 480 },
    { university: 'IIT Kanpur', avgScore: 92, matches: 380, students: 420 },
    { university: 'IIT Chennai', avgScore: 91, matches: 360, students: 400 },
    { university: 'DU', avgScore: 88, matches: 320, students: 380 },
    { university: 'Anna University', avgScore: 87, matches: 300, students: 350 }
  ];

  const socialCategoryData = [
    { category: 'General', count: 3900, percentage: 50 },
    { category: 'OBC', count: 1560, percentage: 20 },
    { category: 'SC', count: 1170, percentage: 15 },
    { category: 'ST', count: 780, percentage: 10 },
    { category: 'Others', count: 390, percentage: 5 }
  ];

  const companyPerformance = [
    { company: 'TCS', avgScore: 92, capacity: 500, filled: 480, efficiency: 96 },
    { company: 'Infosys', avgScore: 91, capacity: 450, filled: 420, efficiency: 93 },
    { company: 'Wipro', avgScore: 90, capacity: 400, filled: 380, efficiency: 95 },
    { company: 'HDFC Bank', avgScore: 89, capacity: 350, filled: 320, efficiency: 91 },
    { company: 'Tata Motors', avgScore: 88, capacity: 300, filled: 280, efficiency: 93 }
  ];

  const KPI = [
    { title: 'Total Allocations', value: '7,800', change: '+12.5%', trend: 'up', icon: Users },
    { title: 'Average Match Score', value: '87.3%', change: '+2.4%', trend: 'up', icon: TrendingUp },
    { title: 'Rural Representation', value: '24.5%', change: '+1.8%', trend: 'up', icon: MapPin },
    { title: 'Social Inclusion', value: '31.2%', change: '+3.2%', trend: 'up', icon: Award }
  ];

  const timeRanges = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' }
  ];

  const metrics = [
    { value: 'overview', label: 'Overview' },
    { value: 'geographic', label: 'Geographic' },
    { value: 'demographic', label: 'Demographic' },
    { value: 'performance', label: 'Performance' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <kpi.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Allocation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={timeRangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="matches" fill="#3b82f6" name="Matches" />
              <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#10b981" strokeWidth={2} name="Avg Score" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="count"
              >
                {sectorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Allocations']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {sectorDistribution.map((sector, index) => (
              <div key={index} className="flex items-center">
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
    </div>
  );

  const renderGeographic = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={geographicDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="state" type="category" width={100} />
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Allocations']} />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rural vs Urban Allocation</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Urban', value: 5850, fill: '#3b82f6' },
                  { name: 'Rural', value: 1950, fill: '#10b981' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {[
                  { name: 'Urban', value: 5850, fill: '#3b82f6' },
                  { name: 'Rural', value: 1950, fill: '#10b981' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Allocations']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Rural Representation: <span className="font-semibold">25%</span> (Target: 25%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDemographic = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Category Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={socialCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Allocations']} />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Male', value: 4680, fill: '#3b82f6' },
                  { name: 'Female', value: 3120, fill: '#ec4899' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {[
                  { name: 'Male', value: 4680, fill: '#3b82f6' },
                  { name: 'Female', value: 3120, fill: '#ec4899' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Allocations']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Gender Ratio: <span className="font-semibold">60:40</span> (Male:Female)
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">University Performance</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={universityPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="university" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#10b981" name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Performance</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={companyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#f59e0b" name="Fill Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={scoreTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Comprehensive insights into allocation performance and trends
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
            </div>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Metrics:</span>
            </div>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {metrics.map((metric) => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="slide-up">
        {selectedMetric === 'overview' && renderOverview()}
        {selectedMetric === 'geographic' && renderGeographic()}
        {selectedMetric === 'demographic' && renderDemographic()}
        {selectedMetric === 'performance' && renderPerformance()}
      </div>
    </div>
  );
};

export default Analytics;