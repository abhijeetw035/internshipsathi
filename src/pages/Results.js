import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MapPin, 
  Star,
  TrendingUp,
  Users,
  Building2,
  Award,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    scoreRange: 'all',
    location: 'all',
    sector: 'all',
    status: 'all'
  });
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showJustification, setShowJustification] = useState(false);

  const matches = [
    {
      id: 1,
      student: {
        name: 'Priya Sharma',
        university: 'IIT Delhi',
        branch: 'Computer Science',
        year: '3rd Year',
        cgpa: 8.5,
        skills: ['Python', 'Machine Learning', 'Data Analysis'],
        location: 'Mumbai, Delhi',
        socialCategory: 'General',
        rural: false
      },
      internship: {
        company: 'TCS',
        position: 'Software Development Intern',
        location: 'Mumbai',
        sector: 'IT',
        duration: '8 weeks',
        stipend: '₹15,000/month',
        skills: ['Python', 'Java', 'React']
      },
      matchScore: 94,
      status: 'matched',
      justification: {
        skillMatch: 45,
        locationMatch: 25,
        sectorMatch: 15,
        policyCompliance: 9,
        total: 94,
        breakdown: {
          skills: 'Excellent match for Python and Machine Learning skills',
          location: 'Mumbai was student\'s first preference',
          sector: 'Strong interest shown in IT sector',
          policy: 'Contributes to gender diversity quota'
        }
      }
    },
    {
      id: 2,
      student: {
        name: 'Rajesh Kumar',
        university: 'IIT Mumbai',
        branch: 'Mechanical Engineering',
        year: '4th Year',
        cgpa: 8.2,
        skills: ['CAD', 'Manufacturing', 'Project Management'],
        location: 'Pune, Mumbai',
        socialCategory: 'OBC',
        rural: true
      },
      internship: {
        company: 'Tata Motors',
        position: 'Manufacturing Intern',
        location: 'Pune',
        sector: 'Manufacturing',
        duration: '10 weeks',
        stipend: '₹12,000/month',
        skills: ['CAD', 'Manufacturing', 'Quality Control']
      },
      matchScore: 91,
      status: 'matched',
      justification: {
        skillMatch: 42,
        locationMatch: 23,
        sectorMatch: 18,
        policyCompliance: 8,
        total: 91,
        breakdown: {
          skills: 'Perfect match for CAD and Manufacturing expertise',
          location: 'Pune location preference satisfied',
          sector: 'Strong alignment with Manufacturing sector',
          policy: 'Rural student representation quota met'
        }
      }
    },
    {
      id: 3,
      student: {
        name: 'Anita Singh',
        university: 'DU',
        branch: 'Economics',
        year: '2nd Year',
        cgpa: 7.8,
        skills: ['Financial Analysis', 'Excel', 'Research'],
        location: 'Delhi, Gurgaon',
        socialCategory: 'SC',
        rural: false
      },
      internship: {
        company: 'HDFC Bank',
        position: 'Finance Intern',
        location: 'Delhi',
        sector: 'Banking',
        duration: '6 weeks',
        stipend: '₹10,000/month',
        skills: ['Financial Analysis', 'Excel', 'Banking Operations']
      },
      matchScore: 89,
      status: 'matched',
      justification: {
        skillMatch: 40,
        locationMatch: 24,
        sectorMatch: 17,
        policyCompliance: 8,
        total: 89,
        breakdown: {
          skills: 'Good match for Financial Analysis skills',
          location: 'Delhi preference fully satisfied',
          sector: 'Banking sector interest aligned',
          policy: 'SC category representation maintained'
        }
      }
    },
    {
      id: 4,
      student: {
        name: 'Vikram Patel',
        university: 'IIT Kanpur',
        branch: 'Electrical Engineering',
        year: '3rd Year',
        cgpa: 8.7,
        skills: ['Power Systems', 'MATLAB', 'Circuit Design'],
        location: 'Bangalore, Hyderabad',
        socialCategory: 'General',
        rural: true
      },
      internship: {
        company: 'Infosys',
        position: 'Software Engineering Intern',
        location: 'Bangalore',
        sector: 'IT',
        duration: '8 weeks',
        stipend: '₹18,000/month',
        skills: ['Python', 'Java', 'Database']
      },
      matchScore: 76,
      status: 'matched',
      justification: {
        skillMatch: 35,
        locationMatch: 22,
        sectorMatch: 12,
        policyCompliance: 7,
        total: 76,
        breakdown: {
          skills: 'Partial skill match - strong analytical background',
          location: 'Bangalore preference satisfied',
          sector: 'IT sector interest present but not primary',
          policy: 'Rural representation quota contribution'
        }
      }
    },
    {
      id: 5,
      student: {
        name: 'Sunita Reddy',
        university: 'Anna University',
        branch: 'Biotechnology',
        year: '4th Year',
        cgpa: 8.0,
        skills: ['Lab Techniques', 'Research', 'Data Analysis'],
        location: 'Chennai, Hyderabad',
        socialCategory: 'ST',
        rural: false
      },
      internship: {
        company: 'Biocon',
        position: 'Research Intern',
        location: 'Bangalore',
        sector: 'Healthcare',
        duration: '12 weeks',
        stipend: '₹14,000/month',
        skills: ['Lab Techniques', 'Research Methods', 'Biotech']
      },
      matchScore: 93,
      status: 'matched',
      justification: {
        skillMatch: 44,
        locationMatch: 18,
        sectorMatch: 23,
        policyCompliance: 8,
        total: 93,
        breakdown: {
          skills: 'Excellent match for lab and research skills',
          location: 'Location preference partially met (Bangalore vs Chennai)',
          sector: 'Perfect alignment with Healthcare/Biotech sector',
          policy: 'ST category representation maintained'
        }
      }
    }
  ];

  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      match.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.internship.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScoreRange = selectedFilters.scoreRange === 'all' || 
      (selectedFilters.scoreRange === 'high' && match.matchScore >= 90) ||
      (selectedFilters.scoreRange === 'medium' && match.matchScore >= 70 && match.matchScore < 90) ||
      (selectedFilters.scoreRange === 'low' && match.matchScore < 70);
    
    const matchesLocation = selectedFilters.location === 'all' || 
      match.internship.location.toLowerCase() === selectedFilters.location.toLowerCase();
    
    const matchesSector = selectedFilters.sector === 'all' || 
      match.internship.sector.toLowerCase() === selectedFilters.sector.toLowerCase();
    
    return matchesSearch && matchesScoreRange && matchesLocation && matchesSector;
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'matched':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const JustificationModal = () => {
    if (!selectedMatch) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Match Justification</h3>
              <button
                onClick={() => setShowJustification(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedMatch.student.name}</h4>
                  <p className="text-sm text-gray-600">{selectedMatch.internship.company} - {selectedMatch.internship.position}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(selectedMatch.matchScore)}`}>
                  {selectedMatch.matchScore}% Match
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-gray-900">Score Breakdown</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Skill Match</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(selectedMatch.justification.skillMatch / 50) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{selectedMatch.justification.skillMatch}/50</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location Match</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(selectedMatch.justification.locationMatch / 25) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{selectedMatch.justification.locationMatch}/25</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sector Match</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(selectedMatch.justification.sectorMatch / 20) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{selectedMatch.justification.sectorMatch}/20</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Policy Compliance</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(selectedMatch.justification.policyCompliance / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{selectedMatch.justification.policyCompliance}/10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Detailed Reasoning</h4>
              
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h5 className="font-medium text-blue-900 mb-1">Skills Match</h5>
                  <p className="text-sm text-blue-700">{selectedMatch.justification.breakdown.skills}</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h5 className="font-medium text-green-900 mb-1">Location Match</h5>
                  <p className="text-sm text-green-700">{selectedMatch.justification.breakdown.location}</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h5 className="font-medium text-purple-900 mb-1">Sector Match</h5>
                  <p className="text-sm text-purple-700">{selectedMatch.justification.breakdown.sector}</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <h5 className="font-medium text-orange-900 mb-1">Policy Compliance</h5>
                  <p className="text-sm text-orange-700">{selectedMatch.justification.breakdown.policy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Matching Results</h1>
            <p className="text-gray-600 mt-2">
              Review and analyze the AI-generated internship allocations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Companies</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(matches.map(m => m.internship.company)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {(matches.reduce((sum, m) => sum + m.matchScore, 0) / matches.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">High Matches (90%+)</p>
              <p className="text-2xl font-bold text-gray-900">
                {matches.filter(m => m.matchScore >= 90).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, companies, or positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center space-x-4">
            <select
              value={selectedFilters.scoreRange}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, scoreRange: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Scores</option>
              <option value="high">High (90%+)</option>
              <option value="medium">Medium (70-89%)</option>
              <option value="low">Low (&lt;70%)</option>
            </select>

            <select
              value={selectedFilters.location}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="pune">Pune</option>
              <option value="hyderabad">Hyderabad</option>
            </select>

            <select
              value={selectedFilters.sector}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, sector: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sectors</option>
              <option value="it">IT</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="banking">Banking</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Internship
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMatches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{match.student.name}</div>
                      <div className="text-sm text-gray-500">{match.student.university}</div>
                      <div className="text-xs text-gray-400">{match.student.branch} • {match.student.year}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{match.internship.company}</div>
                      <div className="text-sm text-gray-500">{match.internship.position}</div>
                      <div className="flex items-center text-xs text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {match.internship.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(match.status)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">{match.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedMatch(match);
                        setShowJustification(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showJustification && <JustificationModal />}
    </div>
  );
};

export default Results;