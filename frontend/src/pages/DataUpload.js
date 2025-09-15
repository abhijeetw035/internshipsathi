import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  Users, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import Papa from 'papaparse';

const DataUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    students: null,
    internships: null
  });
  const [previewData, setPreviewData] = useState({
    students: null,
    internships: null
  });
  const [uploadStatus, setUploadStatus] = useState({
    students: null,
    internships: null
  });

  const onDrop = useCallback((acceptedFiles, fileType) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: file
    }));

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setPreviewData(prev => ({
          ...prev,
          [fileType]: results.data.slice(0, 5) 
        }));
        
        setUploadStatus(prev => ({
          ...prev,
          [fileType]: {
            success: true,
            message: `Successfully uploaded ${results.data.length} records`,
            errors: results.errors
          }
        }));
      },
      error: (error) => {
        setUploadStatus(prev => ({
          ...prev,
          [fileType]: {
            success: false,
            message: `Error parsing file: ${error.message}`,
            errors: []
          }
        }));
      }
    });
  }, []);

  const studentDropzone = useDropzone({
    onDrop: (files) => onDrop(files, 'students'),
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  const internshipDropzone = useDropzone({
    onDrop: (files) => onDrop(files, 'internships'),
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  const removeFile = (fileType) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
    setPreviewData(prev => ({
      ...prev,
      [fileType]: null
    }));
    setUploadStatus(prev => ({
      ...prev,
      [fileType]: null
    }));
  };

  const downloadTemplate = (type) => {
    const templates = {
      students: {
        headers: [
          'student_id', 'name', 'email', 'phone', 'university', 'degree', 'branch', 'year_of_study',
          'cgpa', 'skills', 'location_preference', 'sector_preference', 'social_category', 
          'rural_urban', 'district', 'previous_internships', 'availability_start', 'availability_end'
        ],
        sampleData: [
          'ST001', 'Priya Sharma', 'priya.sharma@email.com', '9876543210', 'IIT Delhi', 'B.Tech', 'Computer Science', '3rd Year',
          '8.5', 'Python, Java, Machine Learning', 'Mumbai, Delhi', 'IT, Finance', 'General', 
          'Urban', 'New Delhi', '0', '2024-06-01', '2024-08-31'
        ]
      },
      internships: {
        headers: [
          'internship_id', 'company_name', 'position_title', 'department', 'location', 'duration_weeks',
          'skills_required', 'qualification_required', 'year_of_study', 'stipend', 'capacity',
          'sector', 'contact_person', 'contact_email', 'application_deadline', 'start_date'
        ],
        sampleData: [
          'INT001', 'TCS', 'Software Development Intern', 'Engineering', 'Mumbai', '8',
          'Python, Java, React', 'B.Tech Computer Science', '3rd Year', '15000', '25',
          'IT', 'HR Manager', 'hr@tcs.com', '2024-05-15', '2024-06-01'
        ]
      }
    };

    const template = templates[type];
    const csvContent = [
      template.headers.join(','),
      template.sampleData.join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const UploadZone = ({ dropzone, fileType, title, description, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <button
          onClick={() => downloadTemplate(fileType)}
          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Template
        </button>
      </div>

      {!uploadedFiles[fileType] ? (
        <div
          {...dropzone.getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dropzone.isDragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...dropzone.getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {dropzone.isDragActive ? 'Drop the file here' : 'Drag & drop your file here'}
          </p>
          <p className="text-sm text-gray-600 mb-4">or click to browse</p>
          <p className="text-xs text-gray-500">
            Supports CSV, XLS, XLSX files up to 10MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{uploadedFiles[fileType].name}</p>
                <p className="text-sm text-gray-600">
                  {(uploadedFiles[fileType].size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => removeFile(fileType)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {uploadStatus[fileType] && (
            <div className={`p-4 rounded-lg flex items-center ${
              uploadStatus[fileType].success
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              {uploadStatus[fileType].success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
              )}
              <div>
                <p className={`font-medium ${
                  uploadStatus[fileType].success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {uploadStatus[fileType].message}
                </p>
                {uploadStatus[fileType].errors && uploadStatus[fileType].errors.length > 0 && (
                  <p className="text-sm text-red-600 mt-1">
                    {uploadStatus[fileType].errors.length} parsing errors found
                  </p>
                )}
              </div>
            </div>
          )}

          {previewData[fileType] && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-900">Data Preview (First 5 rows)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {previewData[fileType][0] && Object.keys(previewData[fileType][0]).map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData[fileType].map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const canProceed = uploadedFiles.students && uploadedFiles.internships && 
                     uploadStatus.students?.success && uploadStatus.internships?.success;

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold text-gray-900">Data Upload</h1>
        <p className="text-gray-600 mt-2">
          Upload student profiles and internship opportunities to begin the matching process
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadZone
          dropzone={studentDropzone}
          fileType="students"
          title="Student Profiles"
          description="Upload CSV file containing student information, skills, and preferences"
          icon={Users}
        />
        
        <UploadZone
          dropzone={internshipDropzone}
          fileType="internships"
          title="Internship Opportunities"
          description="Upload CSV file containing available internship positions and requirements"
          icon={Building2}
        />
      </div>

      {(uploadedFiles.students || uploadedFiles.internships) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Validation Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['students', 'internships'].map((type) => (
              <div key={type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 capitalize">{type} Data</span>
                  {uploadStatus[type] ? (
                    <div className="flex items-center">
                      {uploadStatus[type].success ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <span className={`text-sm font-medium ${
                        uploadStatus[type].success ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {uploadStatus[type].success ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not uploaded</span>
                  )}
                </div>
                
                {uploadStatus[type]?.success && previewData[type] && (
                  <div className="text-sm text-gray-600">
                    <p>• {previewData[type].length} preview rows loaded</p>
                    <p>• {Object.keys(previewData[type][0] || {}).length} columns detected</p>
                    <p>• File format: {uploadedFiles[type]?.type || 'Unknown'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6">
        <button
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Proceed to Configuration
        </button>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            Clear All
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded-lg transition-colors">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;