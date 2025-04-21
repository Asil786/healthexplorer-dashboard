export const institutionsData = [
  {
    id: 1,
    name: "AIIMS Delhi",
    location: "New Delhi, India",
    dataPoints: 32000,
    status: "active",
    lastSync: "2023-10-15T14:30:25.000Z",
    accuracy: 0.92,
    privacyScore: 0.88
  },
  {
    id: 2,
    name: "CMC Vellore",
    location: "Vellore, Tamil Nadu",
    dataPoints: 19000,
    status: "active",
    lastSync: "2023-10-15T14:25:18.000Z",
    accuracy: 0.89,
    privacyScore: 0.95
  },
  {
    id: 3,
    name: "PGIMER Chandigarh",
    location: "Chandigarh, India",
    dataPoints: 12000,
    status: "inactive",
    lastSync: "2023-10-15T14:15:02.000Z",
    accuracy: 0.78,
    privacyScore: 0.82
  },
  {
    id: 4,
    name: "Tata Memorial Hospital",
    location: "Mumbai, Maharashtra",
    dataPoints: 25000,
    status: "active",
    lastSync: "2023-10-15T14:10:47.000Z",
    accuracy: 0.94,
    privacyScore: 0.91
  },
  {
    id: 5,
    name: "Apollo Hospitals",
    location: "Chennai, Tamil Nadu",
    dataPoints: 14000,
    status: "active",
    lastSync: "2023-10-15T13:45:12.000Z",
    accuracy: 0.85,
    privacyScore: 0.87
  },
  {
    id: 6,
    name: "NIMHANS Bengaluru",
    location: "Bengaluru, Karnataka",
    dataPoints: 11000,
    status: "active",
    lastSync: "2023-10-15T13:30:59.000Z",
    accuracy: 0.88,
    privacyScore: 0.84
  },
  {
    id: 7,
    name: "SCTIMST Trivandrum",
    location: "Trivandrum, Kerala",
    dataPoints: 10000,
    status: "active",
    lastSync: "2023-10-15T13:15:35.000Z",
    accuracy: 0.90,
    privacyScore: 0.89
  },
  {
    id: 8,
    name: "KEM Hospital",
    location: "Pune, Maharashtra",
    dataPoints: 8000,
    status: "inactive",
    lastSync: "2023-10-15T12:45:20.000Z",
    accuracy: 0.81,
    privacyScore: 0.79
  }
];

export const institutions = institutionsData;

// Reduce network and infrastructure to reflect a single local server
export const networkData = {
  nodes: [
    { id: 1, name: "Local Federation Server", type: "server", connections: 8, dataProcessed: 121000 },
    { id: 2, name: "AIIMS Delhi", type: "institution", connections: 3, dataProcessed: 32000 },
    { id: 3, name: "CMC Vellore", type: "institution", connections: 2, dataProcessed: 19000 },
    { id: 4, name: "PGIMER Chandigarh", type: "institution", connections: 1, dataProcessed: 12000 }
    // Only a few major hospitals for local setup
  ],
  links: [
    { source: 1, target: 2, strength: 0.9, dataFlow: 4000, value: 4000 },
    { source: 1, target: 3, strength: 0.85, dataFlow: 2000, value: 2000 },
    { source: 1, target: 4, strength: 0.75, dataFlow: 1000, value: 1000 }
  ]
};

export const systemHealth = [
  { timestamp: "2023-10-15 09:00", cpuUsage: 22, memoryUsage: 18, networkLatency: 4 },   // Reduced stats
  { timestamp: "2023-10-15 12:00", cpuUsage: 28, memoryUsage: 22, networkLatency: 5 }
];

export const infrastructureData = {
  serverStatus: [
    { name: "Federated Learning Local Server", status: "operational", uptime: "99.95%", load: 16, region: "India-Central" }
  ],
  resourceUtilization: [
    { timestamp: "2023-10-15 09:00", cpu: 22, memory: 18, storage: 30, network: 8 },
    { timestamp: "2023-10-15 12:00", cpu: 28, memory: 22, storage: 30, network: 10 }
  ],
  storageUsage: [
    { category: "Model Weights", size: 120, growth: 2.1 },
    { category: "Training Data", size: 780, growth: 3.2 }
  ],
  securityEvents: [
    { date: "2023-10-14", type: "Authentication", severity: "low", count: 1, status: "resolved" }
  ]
};

// Update some analytics to reflect Indian institutions in summaries
export const analyticsData = {
  performanceMetrics: [
    { date: "2023-09-15", accuracy: 0.82, precision: 0.84, recall: 0.80, f1Score: 0.82 },
    { date: "2023-09-22", accuracy: 0.84, precision: 0.86, recall: 0.82, f1Score: 0.84 }
  ],
  computationalResources: [
    { date: "2023-09-15", gpuHours: 24, cpuHours: 42, memory: 12 },
    { date: "2023-09-22", gpuHours: 28, cpuHours: 56, memory: 14 }
  ],
  userActivity: [
    { role: "Researchers", count: 12, activeUsers: 9, avgSessionTime: 20 },
    { role: "Clinicians", count: 22, activeUsers: 16, avgSessionTime: 12 }
  ],
  institutionContributions: [
    { name: "AIIMS Delhi", dataPoints: 32000, models: 1, accuracy: 0.92 },
    { name: "CMC Vellore", dataPoints: 19000, models: 1, accuracy: 0.89 },
    { name: "Tata Memorial Hospital", dataPoints: 25000, models: 1, accuracy: 0.94 }
  ]
};
export const trainingProgress = [
  { epoch: 1, accuracy: 0.68, loss: 0.42, privacyBudget: 0.8, timestamp: "2023-09-01" },
  { epoch: 2, accuracy: 0.72, loss: 0.36, privacyBudget: 0.7, timestamp: "2023-09-02" },
  { epoch: 3, accuracy: 0.75, loss: 0.31, privacyBudget: 0.65, timestamp: "2023-09-03" },
  { epoch: 4, accuracy: 0.79, loss: 0.27, privacyBudget: 0.6, timestamp: "2023-09-04" },
  { epoch: 5, accuracy: 0.82, loss: 0.24, privacyBudget: 0.55, timestamp: "2023-09-05" },
  { epoch: 6, accuracy: 0.84, loss: 0.21, privacyBudget: 0.5, timestamp: "2023-09-06" },
  { epoch: 7, accuracy: 0.86, loss: 0.19, privacyBudget: 0.45, timestamp: "2023-09-07" },
  { epoch: 8, accuracy: 0.88, loss: 0.17, privacyBudget: 0.4, timestamp: "2023-09-08" },
  { epoch: 9, accuracy: 0.89, loss: 0.15, privacyBudget: 0.35, timestamp: "2023-09-09" },
  { epoch: 10, accuracy: 0.91, loss: 0.13, privacyBudget: 0.3, timestamp: "2023-09-10" }
];

export const privacyMetrics = [
  { 
    date: "2023-09-01",
    differentialPrivacy: 0.82,
    informationLeakage: 0.18,
    modelConfusion: 0.75,
    membershipInference: 0.15
  },
  { 
    date: "2023-09-02",
    differentialPrivacy: 0.83,
    informationLeakage: 0.17,
    modelConfusion: 0.77,
    membershipInference: 0.14
  },
  { 
    date: "2023-09-03",
    differentialPrivacy: 0.84,
    informationLeakage: 0.16,
    modelConfusion: 0.78,
    membershipInference: 0.13
  },
  { 
    date: "2023-09-04",
    differentialPrivacy: 0.85,
    informationLeakage: 0.15,
    modelConfusion: 0.80,
    membershipInference: 0.12
  },
  { 
    date: "2023-09-05",
    differentialPrivacy: 0.86,
    informationLeakage: 0.14,
    modelConfusion: 0.82,
    membershipInference: 0.11
  },
  { 
    date: "2023-09-06",
    differentialPrivacy: 0.87,
    informationLeakage: 0.13,
    modelConfusion: 0.83,
    membershipInference: 0.10
  },
  { 
    date: "2023-09-07",
    differentialPrivacy: 0.88,
    informationLeakage: 0.12,
    modelConfusion: 0.85,
    membershipInference: 0.09
  }
];

export const modelComparison = [
  {
    model: "Centralized",
    accuracy: 0.88,
    privacy: 0.62,
    computation: 1.0,
    communication: 1.0
  },
  {
    model: "Federated",
    accuracy: 0.91,
    privacy: 0.87,
    computation: 0.75,
    communication: 0.68
  },
  {
    model: "Differential Privacy",
    accuracy: 0.85,
    privacy: 0.92,
    computation: 0.82,
    communication: 0.71
  },
  {
    model: "Homomorphic",
    accuracy: 0.82,
    privacy: 0.95,
    computation: 0.45,
    communication: 0.65
  }
];

export const diagnosticMetrics = [
  { name: "Lung Cancer", accuracy: 0.89, precision: 0.92, recall: 0.86, specificity: 0.93 },
  { name: "Pneumonia", accuracy: 0.92, precision: 0.93, recall: 0.91, specificity: 0.94 },
  { name: "Tuberculosis", accuracy: 0.87, precision: 0.89, recall: 0.82, specificity: 0.90 },
  { name: "COVID-19", accuracy: 0.91, precision: 0.92, recall: 0.90, specificity: 0.93 },
  { name: "Pleural Effusion", accuracy: 0.88, precision: 0.90, recall: 0.85, specificity: 0.91 }
];

export const dataDistribution = [
  { category: "X-Ray", count: 45600 },
  { category: "CT Scan", count: 28700 },
  { category: "MRI", count: 18900 },
  { category: "Ultrasound", count: 12500 },
  { category: "Lab Results", count: 56300 }
];

export const networkMetricsData = {
  packetLoss: [
    { timestamp: "00:00", value: 0.2 },
    { timestamp: "04:00", value: 0.1 },
    { timestamp: "08:00", value: 0.5 },
    { timestamp: "12:00", value: 0.8 },
    { timestamp: "16:00", value: 0.6 },
    { timestamp: "20:00", value: 0.4 },
    { timestamp: "23:59", value: 0.3 }
  ],
  latency: [
    { timestamp: "00:00", value: 12 },
    { timestamp: "04:00", value: 10 },
    { timestamp: "08:00", value: 18 },
    { timestamp: "12:00", value: 24 },
    { timestamp: "16:00", value: 20 },
    { timestamp: "20:00", value: 16 },
    { timestamp: "23:59", value: 14 }
  ],
  bandwidth: [
    { timestamp: "00:00", value: 32 },
    { timestamp: "04:00", value: 28 },
    { timestamp: "08:00", value: 65 },
    { timestamp: "12:00", value: 89 },
    { timestamp: "16:00", value: 75 },
    { timestamp: "20:00", value: 55 },
    { timestamp: "23:59", value: 40 }
  ],
  messageCount: [
    { category: "Authentication", count: 12 },
    { category: "Data Access", count: 8 },
    { category: "Encryption", count: 3 },
    { category: "Network", count: 5 }
  ]
};

export const modelTrainingHistory = [
  { date: "2023-09-01", accuracy: 0.75, loss: 0.35, privacyScore: 0.82 },
  { date: "2023-09-08", accuracy: 0.79, loss: 0.30, privacyScore: 0.84 },
  { date: "2023-09-15", accuracy: 0.83, loss: 0.25, privacyScore: 0.85 },
  { date: "2023-09-22", accuracy: 0.86, loss: 0.22, privacyScore: 0.87 },
  { date: "2023-09-29", accuracy: 0.89, loss: 0.19, privacyScore: 0.88 },
  { date: "2023-10-06", accuracy: 0.91, loss: 0.17, privacyScore: 0.90 },
  { date: "2023-10-13", accuracy: 0.92, loss: 0.15, privacyScore: 0.91 }
];

export const modelsData = [
  {
    id: 1,
    name: "Pneumonia Detection",
    version: "v2.3.1",
    type: "CNN",
    accuracy: 0.92,
    lastTrained: "2023-10-13",
    status: "deployed",
    institutions: 6,
    privacy: 0.91
  },
  {
    id: 2,
    name: "Diabetes Prediction",
    version: "v1.5.2",
    type: "Random Forest",
    accuracy: 0.88,
    lastTrained: "2023-10-10",
    status: "deployed",
    institutions: 8,
    privacy: 0.86
  },
  {
    id: 3,
    name: "Heart Disease Risk",
    version: "v1.2.0",
    type: "Gradient Boosting",
    accuracy: 0.85,
    lastTrained: "2023-10-05",
    status: "training",
    institutions: 5,
    privacy: 0.89
  },
  {
    id: 4,
    name: "Brain Tumor Segmentation",
    version: "v0.9.1",
    type: "U-Net",
    accuracy: 0.83,
    lastTrained: "2023-09-28",
    status: "testing",
    institutions: 4,
    privacy: 0.92
  },
  {
    id: 5,
    name: "Skin Lesion Classifier",
    version: "v1.1.0",
    type: "EfficientNet",
    accuracy: 0.90,
    lastTrained: "2023-10-01",
    status: "deployed",
    institutions: 7,
    privacy: 0.88
  }
];

export const privacyData = {
  privacyScores: [
    { date: "2023-08-15", score: 0.78, threshold: 0.75 },
    { date: "2023-08-22", score: 0.79, threshold: 0.75 },
    { date: "2023-08-29", score: 0.82, threshold: 0.75 },
    { date: "2023-09-05", score: 0.84, threshold: 0.80 },
    { date: "2023-09-12", score: 0.85, threshold: 0.80 },
    { date: "2023-09-19", score: 0.87, threshold: 0.80 },
    { date: "2023-09-26", score: 0.89, threshold: 0.85 },
    { date: "2023-10-03", score: 0.90, threshold: 0.85 },
    { date: "2023-10-10", score: 0.91, threshold: 0.85 }
  ],
  privacyAudits: [
    { date: "2023-10-10", status: "passed", issues: 0, score: 0.91, auditor: "PrivacyShield Inc." },
    { date: "2023-09-10", status: "passed", issues: 1, score: 0.87, auditor: "PrivacyShield Inc." },
    { date: "2023-08-10", status: "warning", issues: 3, score: 0.81, auditor: "PrivacyShield Inc." },
    { date: "2023-07-10", status: "warning", issues: 5, score: 0.76, auditor: "PrivacyShield Inc." },
    { date: "2023-06-10", status: "failed", issues: 8, score: 0.72, auditor: "PrivacyShield Inc." }
  ],
  epsilonValues: [
    { model: "Pneumonia Detection", epsilon: 0.5, date: "2023-10-13" },
    { model: "Diabetes Prediction", epsilon: 0.8, date: "2023-10-10" },
    { model: "Heart Disease Risk", epsilon: 0.6, date: "2023-10-05" },
    { model: "Brain Tumor Segmentation", epsilon: 0.4, date: "2023-09-28" },
    { model: "Skin Lesion Classifier", epsilon: 0.7, date: "2023-10-01" }
  ],
  complianceStatus: [
    { regulation: "HIPAA", status: "compliant", lastVerified: "2023-10-05", score: 0.94 },
    { regulation: "GDPR", status: "compliant", lastVerified: "2023-10-05", score: 0.92 },
    { regulation: "CCPA", status: "compliant", lastVerified: "2023-10-05", score: 0.95 },
    { regulation: "PIPEDA", status: "monitoring", lastVerified: "2023-09-22", score: 0.88 },
    { regulation: "HITECH", status: "compliant", lastVerified: "2023-10-05", score: 0.93 }
  ]
};

export const infrastructureData = {
  serverStatus: [
    { name: "Federated Learning Local Server", status: "operational", uptime: "99.95%", load: 16, region: "India-Central" }
  ],
  resourceUtilization: [
    { timestamp: "2023-10-15 09:00", cpu: 22, memory: 18, storage: 30, network: 8 },
    { timestamp: "2023-10-15 12:00", cpu: 28, memory: 22, storage: 30, network: 10 }
  ],
  storageUsage: [
    { category: "Model Weights", size: 120, growth: 2.1 },
    { category: "Training Data", size: 780, growth: 3.2 }
  ],
  securityEvents: [
    { date: "2023-10-14", type: "Authentication", severity: "low", count: 1, status: "resolved" }
  ]
};
