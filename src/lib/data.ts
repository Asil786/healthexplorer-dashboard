
// Sample data for healthcare federated learning dashboard

// Institutions participating in the federated learning
export const institutions = [
  { 
    id: 1, 
    name: "General Hospital", 
    location: "New York, NY", 
    dataPoints: 5289, 
    status: "active", 
    lastSync: "2023-10-15T14:30:00Z",
    accuracy: 0.923,
    privacyScore: 0.89
  },
  { 
    id: 2, 
    name: "University Medical Center", 
    location: "Boston, MA", 
    dataPoints: 8942, 
    status: "active", 
    lastSync: "2023-10-15T13:45:00Z",
    accuracy: 0.891,
    privacyScore: 0.92
  },
  { 
    id: 3, 
    name: "Central Health Clinic", 
    location: "Chicago, IL", 
    dataPoints: 3217, 
    status: "active", 
    lastSync: "2023-10-15T12:15:00Z",
    accuracy: 0.907,
    privacyScore: 0.88
  },
  { 
    id: 4, 
    name: "Pacific Research Institute", 
    location: "San Francisco, CA", 
    dataPoints: 6701, 
    status: "active", 
    lastSync: "2023-10-15T10:20:00Z",
    accuracy: 0.934,
    privacyScore: 0.95
  },
  { 
    id: 5, 
    name: "Riverside Medical Group", 
    location: "Austin, TX", 
    dataPoints: 4123, 
    status: "inactive", 
    lastSync: "2023-10-14T16:50:00Z",
    accuracy: 0.886,
    privacyScore: 0.91
  },
  { 
    id: 6, 
    name: "Mountain View Health", 
    location: "Denver, CO", 
    dataPoints: 3952, 
    status: "active", 
    lastSync: "2023-10-15T11:10:00Z",
    accuracy: 0.919,
    privacyScore: 0.93
  },
  { 
    id: 7, 
    name: "Atlantic Research Center", 
    location: "Miami, FL", 
    dataPoints: 5729, 
    status: "active", 
    lastSync: "2023-10-15T09:30:00Z",
    accuracy: 0.902,
    privacyScore: 0.87
  }
];

// Model training progress data
export const trainingProgress = [
  { epoch: 1, accuracy: 0.65, loss: 0.72, privacyBudget: 1.0 },
  { epoch: 2, accuracy: 0.71, loss: 0.58, privacyBudget: 0.91 },
  { epoch: 3, accuracy: 0.76, loss: 0.47, privacyBudget: 0.82 },
  { epoch: 4, accuracy: 0.79, loss: 0.38, privacyBudget: 0.73 },
  { epoch: 5, accuracy: 0.82, loss: 0.33, privacyBudget: 0.64 },
  { epoch: 6, accuracy: 0.84, loss: 0.28, privacyBudget: 0.55 },
  { epoch: 7, accuracy: 0.86, loss: 0.24, privacyBudget: 0.46 },
  { epoch: 8, accuracy: 0.88, loss: 0.21, privacyBudget: 0.37 },
  { epoch: 9, accuracy: 0.89, loss: 0.19, privacyBudget: 0.28 },
  { epoch: 10, accuracy: 0.91, loss: 0.17, privacyBudget: 0.19 }
];

// Privacy metrics data
export const privacyMetrics = [
  { 
    date: '2023-10-01', 
    differentialPrivacy: 0.95, 
    informationLeakage: 0.03, 
    modelConfusion: 0.92,
    membershipInference: 0.02
  },
  { 
    date: '2023-10-02', 
    differentialPrivacy: 0.94, 
    informationLeakage: 0.04, 
    modelConfusion: 0.93,
    membershipInference: 0.02
  },
  { 
    date: '2023-10-03', 
    differentialPrivacy: 0.96, 
    informationLeakage: 0.02, 
    modelConfusion: 0.95,
    membershipInference: 0.01
  },
  { 
    date: '2023-10-04', 
    differentialPrivacy: 0.97, 
    informationLeakage: 0.02, 
    modelConfusion: 0.94,
    membershipInference: 0.01
  },
  { 
    date: '2023-10-05', 
    differentialPrivacy: 0.96, 
    informationLeakage: 0.03, 
    modelConfusion: 0.95,
    membershipInference: 0.02
  },
  { 
    date: '2023-10-06', 
    differentialPrivacy: 0.95, 
    informationLeakage: 0.04, 
    modelConfusion: 0.96,
    membershipInference: 0.02
  },
  { 
    date: '2023-10-07', 
    differentialPrivacy: 0.97, 
    informationLeakage: 0.03, 
    modelConfusion: 0.97,
    membershipInference: 0.01
  },
  { 
    date: '2023-10-08', 
    differentialPrivacy: 0.98, 
    informationLeakage: 0.02, 
    modelConfusion: 0.98,
    membershipInference: 0.01
  },
  { 
    date: '2023-10-09', 
    differentialPrivacy: 0.98, 
    informationLeakage: 0.01, 
    modelConfusion: 0.98,
    membershipInference: 0.01
  },
  { 
    date: '2023-10-10', 
    differentialPrivacy: 0.99, 
    informationLeakage: 0.01, 
    modelConfusion: 0.99,
    membershipInference: 0.01
  }
];

// Model comparison data
export const modelComparison = [
  {
    name: "Federated CNN",
    accuracy: 0.91,
    precision: 0.89,
    recall: 0.92,
    f1Score: 0.905,
    privacyScore: 0.94,
    computeTime: 342, // seconds
    federationRounds: 10
  },
  {
    name: "Centralized CNN", 
    accuracy: 0.93,
    precision: 0.92,
    recall: 0.91,
    f1Score: 0.915,
    privacyScore: 0.71,
    computeTime: 210,
    federationRounds: 0
  },
  {
    name: "Federated LSTM",
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.90,
    f1Score: 0.884,
    privacyScore: 0.92,
    computeTime: 456,
    federationRounds: 8
  },
  {
    name: "DP-Federated CNN",
    accuracy: 0.88,
    precision: 0.86,
    recall: 0.87,
    f1Score: 0.865,
    privacyScore: 0.98,
    computeTime: 389,
    federationRounds: 12
  }
];

// Diagnostic metrics data
export const diagnosticMetrics = [
  { name: 'Heart Disease', accuracy: 0.92, precision: 0.89, recall: 0.91, specificity: 0.93 },
  { name: 'Diabetes', accuracy: 0.89, precision: 0.87, recall: 0.88, specificity: 0.90 },
  { name: 'Pneumonia', accuracy: 0.94, precision: 0.92, recall: 0.93, specificity: 0.95 },
  { name: 'Stroke', accuracy: 0.87, precision: 0.85, recall: 0.84, specificity: 0.89 },
  { name: 'Cancer', accuracy: 0.91, precision: 0.92, recall: 0.90, specificity: 0.92 },
];

// Network graph data
export const networkData = {
  nodes: [
    { id: 1, name: "Central Server", type: "server" },
    { id: 2, name: "General Hospital", type: "institution" },
    { id: 3, name: "University Medical Center", type: "institution" },
    { id: 4, name: "Central Health Clinic", type: "institution" },
    { id: 5, name: "Pacific Research Institute", type: "institution" },
    { id: 6, name: "Riverside Medical Group", type: "institution" },
    { id: 7, name: "Mountain View Health", type: "institution" },
    { id: 8, name: "Atlantic Research Center", type: "institution" },
  ],
  links: [
    { source: 1, target: 2, value: 5289 },
    { source: 1, target: 3, value: 8942 },
    { source: 1, target: 4, value: 3217 },
    { source: 1, target: 5, value: 6701 },
    { source: 1, target: 6, value: 4123 },
    { source: 1, target: 7, value: 3952 },
    { source: 1, target: 8, value: 5729 },
    { source: 2, target: 3, value: 1200 },
    { source: 4, target: 5, value: 900 },
    { source: 6, target: 7, value: 800 },
  ]
};

// Data distribution metrics
export const dataDistribution = [
  { category: "Cardiac", count: 12584 },
  { category: "Respiratory", count: 8942 },
  { category: "Diabetic", count: 7632 },
  { category: "Oncology", count: 6598 },
  { category: "Neurology", count: 5321 },
  { category: "Infectious", count: 4752 },
  { category: "Pediatric", count: 3871 }
];

// Time-based performance metrics
export const performanceOverTime = [
  { month: 'Jan', accuracy: 0.82, privacyBudget: 0.85 },
  { month: 'Feb', accuracy: 0.83, privacyBudget: 0.82 },
  { month: 'Mar', accuracy: 0.85, privacyBudget: 0.80 },
  { month: 'Apr', accuracy: 0.86, privacyBudget: 0.78 },
  { month: 'May', accuracy: 0.87, privacyBudget: 0.75 },
  { month: 'Jun', accuracy: 0.89, privacyBudget: 0.72 },
  { month: 'Jul', accuracy: 0.90, privacyBudget: 0.70 },
  { month: 'Aug', accuracy: 0.91, privacyBudget: 0.65 },
  { month: 'Sep', accuracy: 0.92, privacyBudget: 0.60 },
  { month: 'Oct', accuracy: 0.93, privacyBudget: 0.55 },
];

// System health metrics
export const systemHealth = [
  { timestamp: '08:00', cpuUsage: 45, memoryUsage: 38, networkLatency: 120 },
  { timestamp: '09:00', cpuUsage: 52, memoryUsage: 41, networkLatency: 125 },
  { timestamp: '10:00', cpuUsage: 68, memoryUsage: 52, networkLatency: 130 },
  { timestamp: '11:00', cpuUsage: 73, memoryUsage: 58, networkLatency: 135 },
  { timestamp: '12:00', cpuUsage: 80, memoryUsage: 65, networkLatency: 140 },
  { timestamp: '13:00', cpuUsage: 76, memoryUsage: 62, networkLatency: 138 },
  { timestamp: '14:00', cpuUsage: 69, memoryUsage: 58, networkLatency: 132 },
  { timestamp: '15:00', cpuUsage: 62, memoryUsage: 53, networkLatency: 128 },
  { timestamp: '16:00', cpuUsage: 56, memoryUsage: 49, networkLatency: 125 },
];
