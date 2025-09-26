
// Demo Account Configuration
export const DEMO_ACCOUNTS = {
  admin: {
    email: 'admin@weddingmoments.com',
    password: 'admin123',
    role: 'admin',
    redirectTo: '/admin/dashboard',
    permissions: ['all']
  },
  venue: {
    email: 'venue@grandhotel.com', 
    password: 'venue123',
    role: 'venue',
    redirectTo: '/venue/dashboard',
    permissions: ['moderate_own_weddings', 'view_reports']
  },
  couple: {
    email: 'sarah.michael@email.com',
    password: 'couple123', 
    role: 'couple',
    redirectTo: '/couple/dashboard',
    permissions: ['manage_own_wedding', 'create_invites', 'moderate_content']
  },
  guest: {
    email: 'guest@example.com',
    password: 'guest123',
    role: 'guest', 
    redirectTo: '/guest/dashboard',
    permissions: ['view_feed', 'upload_media', 'like_comment']
  }
} as const;

// Valid Wedding Codes
export const VALID_WEDDING_CODES = [
  'WEDDING-2024-SARAH-MICHAEL',
  'WEDDING-2024-SARAH-MICHAEL-DEMO',
  'WEDDING-2024-DEMO',
  'WEDDING-2024-JOHN-JANE',
  'WEDDING-2023-ALEX-EMMA',
  'WEDDING-2023-DAVID-LISA'
] as const;

// Enhanced Permission System
export const PERMISSIONS = {
  // Admin Permissions (Full System Control)
  MANAGE_ALL_SYSTEM: 'manage_all_system',
  CREATE_VENUE_ACCOUNTS: 'create_venue_accounts',
  MANAGE_ALL_USERS: 'manage_all_users',
  MANAGE_ALL_WEDDINGS: 'manage_all_weddings',
  EDIT_ALL_MEDIA: 'edit_all_media',
  DOWNLOAD_ALL_MEDIA: 'download_all_media',
  DELETE_ALL_CONTENT: 'delete_all_content',
  VIEW_ALL_LOGS: 'view_all_logs',
  SYSTEM_SETTINGS: 'system_settings',
  CONTROL_DOWNLOAD_PERMISSIONS: 'control_download_permissions',
  
  // Venue Owner Permissions
  MANAGE_VENUE_PROFILE: 'manage_venue_profile',
  ADD_COUPLES_TO_VENUE: 'add_couples_to_venue',
  MANAGE_VENUE_COUPLES: 'manage_venue_couples',
  UPDATE_COUPLE_INFO: 'update_couple_info',
  DOWNLOAD_VENUE_MEDIA: 'download_venue_media',
  VIEW_VENUE_ANALYTICS: 'view_venue_analytics',
  MODERATE_VENUE_CONTENT: 'moderate_venue_content',
  
  // Couple Permissions
  MANAGE_OWN_WEDDING: 'manage_own_wedding',
  EDIT_WEDDING_PROFILE: 'edit_wedding_profile',
  MODERATE_OWN_CONTENT: 'moderate_own_content',
  DOWNLOAD_OWN_MEDIA: 'download_own_media',
  BULK_DOWNLOAD_MEDIA: 'bulk_download_media',
  SET_GUEST_PERMISSIONS: 'set_guest_permissions',
  CREATE_INVITES: 'create_invites',
  GENERATE_QR: 'generate_qr',
  APPROVE_GUEST_UPLOADS: 'approve_guest_uploads',
  
  // Guest Permissions
  VIEW_ASSIGNED_WEDDINGS: 'view_assigned_weddings',
  UPLOAD_MEDIA_PENDING: 'upload_media_pending',
  DOWNLOAD_PERMITTED_MEDIA: 'download_permitted_media',
  DOWNLOAD_OWN_UPLOADS: 'download_own_uploads',
  LIKE_COMMENT: 'like_comment',
  VIEW_PROFILES: 'view_profiles'
} as const;

// Enhanced Role Permissions Mapping
export const ROLE_PERMISSIONS = {
  admin: [
    // Full system control
    PERMISSIONS.MANAGE_ALL_SYSTEM,
    PERMISSIONS.CREATE_VENUE_ACCOUNTS,
    PERMISSIONS.MANAGE_ALL_USERS,
    PERMISSIONS.MANAGE_ALL_WEDDINGS,
    PERMISSIONS.EDIT_ALL_MEDIA,
    PERMISSIONS.DOWNLOAD_ALL_MEDIA,
    PERMISSIONS.DELETE_ALL_CONTENT,
    PERMISSIONS.VIEW_ALL_LOGS,
    PERMISSIONS.SYSTEM_SETTINGS,
    PERMISSIONS.CONTROL_DOWNLOAD_PERMISSIONS,
    // Can also do everything others can do
    PERMISSIONS.MANAGE_VENUE_PROFILE,
    PERMISSIONS.ADD_COUPLES_TO_VENUE,
    PERMISSIONS.MANAGE_VENUE_COUPLES,
    PERMISSIONS.UPDATE_COUPLE_INFO,
    PERMISSIONS.DOWNLOAD_VENUE_MEDIA,
    PERMISSIONS.VIEW_VENUE_ANALYTICS,
    PERMISSIONS.MODERATE_VENUE_CONTENT,
    PERMISSIONS.MANAGE_OWN_WEDDING,
    PERMISSIONS.EDIT_WEDDING_PROFILE,
    PERMISSIONS.MODERATE_OWN_CONTENT,
    PERMISSIONS.DOWNLOAD_OWN_MEDIA,
    PERMISSIONS.BULK_DOWNLOAD_MEDIA,
    PERMISSIONS.SET_GUEST_PERMISSIONS,
    PERMISSIONS.CREATE_INVITES,
    PERMISSIONS.GENERATE_QR,
    PERMISSIONS.APPROVE_GUEST_UPLOADS,
    PERMISSIONS.VIEW_ASSIGNED_WEDDINGS,
    PERMISSIONS.UPLOAD_MEDIA_PENDING,
    PERMISSIONS.DOWNLOAD_PERMITTED_MEDIA,
    PERMISSIONS.DOWNLOAD_OWN_UPLOADS,
    PERMISSIONS.LIKE_COMMENT,
    PERMISSIONS.VIEW_PROFILES
  ],
  venue: [
    // Venue specific permissions
    PERMISSIONS.MANAGE_VENUE_PROFILE,
    PERMISSIONS.ADD_COUPLES_TO_VENUE,
    PERMISSIONS.MANAGE_VENUE_COUPLES,
    PERMISSIONS.UPDATE_COUPLE_INFO,
    PERMISSIONS.DOWNLOAD_VENUE_MEDIA,
    PERMISSIONS.VIEW_VENUE_ANALYTICS,
    PERMISSIONS.MODERATE_VENUE_CONTENT,
    // Basic user permissions
    PERMISSIONS.VIEW_PROFILES,
    PERMISSIONS.LIKE_COMMENT
  ],
  couple: [
    // Wedding management permissions
    PERMISSIONS.MANAGE_OWN_WEDDING,
    PERMISSIONS.EDIT_WEDDING_PROFILE,
    PERMISSIONS.MODERATE_OWN_CONTENT,
    PERMISSIONS.DOWNLOAD_OWN_MEDIA,
    PERMISSIONS.BULK_DOWNLOAD_MEDIA,
    PERMISSIONS.SET_GUEST_PERMISSIONS,
    PERMISSIONS.CREATE_INVITES,
    PERMISSIONS.GENERATE_QR,
    PERMISSIONS.APPROVE_GUEST_UPLOADS,
    // Basic user permissions
    PERMISSIONS.VIEW_PROFILES,
    PERMISSIONS.LIKE_COMMENT,
    PERMISSIONS.UPLOAD_MEDIA_PENDING
  ],
  guest: [
    // Limited guest permissions
    PERMISSIONS.VIEW_ASSIGNED_WEDDINGS,
    PERMISSIONS.UPLOAD_MEDIA_PENDING,
    PERMISSIONS.DOWNLOAD_PERMITTED_MEDIA,
    PERMISSIONS.DOWNLOAD_OWN_UPLOADS,
    PERMISSIONS.LIKE_COMMENT,
    PERMISSIONS.VIEW_PROFILES
  ]
} as const;

// Download Permission Levels
export const DOWNLOAD_PERMISSIONS = {
  ALL_MEDIA: 'all_media',           // Can download all approved media
  PERMITTED_ONLY: 'permitted_only', // Can only download specifically permitted media
  OWN_UPLOADS: 'own_uploads',       // Can only download their own uploads
  NO_DOWNLOAD: 'no_download'        // Cannot download anything
} as const;

// Media Status Types
export const MEDIA_STATUS = {
  PENDING: 'pending',           // Waiting for approval
  APPROVED: 'approved',         // Approved and visible
  REJECTED: 'rejected',         // Rejected by moderator
  PRIVATE: 'private',           // Private to couple only
  ARCHIVED: 'archived'          // Archived but not deleted
} as const;

// User Registration Types
export const REGISTRATION_TYPES = {
  ADMIN_CREATED: 'admin_created',        // Account created by admin
  VENUE_INVITED: 'venue_invited',        // Added by venue owner
  SELF_REGISTERED: 'self_registered',    // Self registration
  GUEST_INVITED: 'guest_invited'         // Invited as guest
} as const;

// Download Activity Logging
export interface DownloadLog {
  id: string;
  userId: string;
  userRole: string;
  mediaId: string;
  mediaType: 'image' | 'video';
  downloadType: 'single' | 'bulk';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  weddingId?: string;
}

// Permission Check Functions
export const hasPermission = (userRole: string, permission: string): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS];
  return rolePermissions?.includes(permission as any) || false;
};

export const canDownloadMedia = (
  userRole: string, 
  mediaOwnerId: string, 
  currentUserId: string, 
  mediaStatus: string,
  downloadPermissionLevel: string = DOWNLOAD_PERMISSIONS.PERMITTED_ONLY
): boolean => {
  // Admin can download everything
  if (userRole === 'admin') return true;
  
  // Media must be approved (except for own uploads)
  if (mediaStatus !== MEDIA_STATUS.APPROVED && mediaOwnerId !== currentUserId) {
    return false;
  }
  
  // Users can always download their own uploads
  if (mediaOwnerId === currentUserId) return true;
  
  // Check role-specific permissions
  switch (userRole) {
    case 'venue':
      return hasPermission(userRole, PERMISSIONS.DOWNLOAD_VENUE_MEDIA);
    case 'couple':
      return hasPermission(userRole, PERMISSIONS.DOWNLOAD_OWN_MEDIA);
    case 'guest':
      return downloadPermissionLevel === DOWNLOAD_PERMISSIONS.ALL_MEDIA || 
             downloadPermissionLevel === DOWNLOAD_PERMISSIONS.PERMITTED_ONLY;
    default:
      return false;
  }
};

export const canBulkDownload = (userRole: string): boolean => {
  return hasPermission(userRole, PERMISSIONS.BULK_DOWNLOAD_MEDIA) || 
         hasPermission(userRole, PERMISSIONS.DOWNLOAD_ALL_MEDIA);
};

export const canEditMedia = (
  userRole: string, 
  mediaOwnerId: string, 
  currentUserId: string
): boolean => {
  // Admin can edit everything
  if (hasPermission(userRole, PERMISSIONS.EDIT_ALL_MEDIA)) return true;
  
  // Users can edit their own uploads
  if (mediaOwnerId === currentUserId) return true;
  
  // Venue owners can moderate their venue's content
  if (userRole === 'venue' && hasPermission(userRole, PERMISSIONS.MODERATE_VENUE_CONTENT)) {
    return true;
  }
  
  // Couples can moderate their wedding content
  if (userRole === 'couple' && hasPermission(userRole, PERMISSIONS.MODERATE_OWN_CONTENT)) {
    return true;
  }
  
  return false;
};

export const canCreateVenueAccount = (userRole: string): boolean => {
  return hasPermission(userRole, PERMISSIONS.CREATE_VENUE_ACCOUNTS);
};

export const canAddCouplesToVenue = (userRole: string): boolean => {
  return hasPermission(userRole, PERMISSIONS.ADD_COUPLES_TO_VENUE);
};

export const canApproveGuestUploads = (userRole: string): boolean => {
  return hasPermission(userRole, PERMISSIONS.APPROVE_GUEST_UPLOADS) ||
         hasPermission(userRole, PERMISSIONS.MODERATE_OWN_CONTENT) ||
         hasPermission(userRole, PERMISSIONS.MODERATE_VENUE_CONTENT);
};

// Activity Logging Functions
export const logDownloadActivity = (downloadLog: DownloadLog): void => {
  // In a real app, this would save to database
  console.log('Download Activity:', downloadLog);
  
  // Store in localStorage for demo purposes
  const existingLogs = JSON.parse(localStorage.getItem('downloadLogs') || '[]');
  existingLogs.push(downloadLog);
  localStorage.setItem('downloadLogs', JSON.stringify(existingLogs));
};

export const getDownloadLogs = (filters?: {
  userId?: string;
  dateRange?: string;
  mediaType?: string;
}): DownloadLog[] => {
  const logs = JSON.parse(localStorage.getItem('downloadLogs') || '[]');
  
  if (!filters) return logs;
  
  return logs.filter((log: DownloadLog) => {
    if (filters.userId && log.userId !== filters.userId) return false;
    if (filters.mediaType && log.mediaType !== filters.mediaType) return false;
    // Add date range filtering logic here
    return true;
  });
};

// Route Protection
export const PROTECTED_ROUTES = {
  '/admin': ['admin'],
  '/venue': ['venue', 'admin'],
  '/couple': ['couple', 'admin'], 
  '/guest': ['guest', 'couple', 'venue', 'admin'],
  '/w/': ['guest', 'couple', 'venue', 'admin']
} as const;

export const canAccessRoute = (userRole: string, route: string): boolean => {
  const routeKey = Object.keys(PROTECTED_ROUTES).find(key => route.startsWith(key));
  if (!routeKey) return true;
  
  const allowedRoles = PROTECTED_ROUTES[routeKey as keyof typeof PROTECTED_ROUTES];
  return allowedRoles.includes(userRole as any);
};

// Wedding Package Configuration
export const WEDDING_PACKAGES = {
  BASIC: {
    name: 'Basic',
    price: 299,
    features: ['50 guests', 'Basic templates', 'Photo sharing', 'QR invites'],
    downloadLimit: 100,
    storageLimit: '1GB'
  },
  PREMIUM: {
    name: 'Premium', 
    price: 599,
    features: ['150 guests', 'Premium templates', 'Video sharing', 'Custom QR', 'Analytics'],
    downloadLimit: 500,
    storageLimit: '5GB'
  },
  LUXURY: {
    name: 'Luxury',
    price: 999,
    features: ['Unlimited guests', 'Custom design', 'Live streaming', 'Professional photos', 'Full analytics'],
    downloadLimit: -1, // Unlimited
    storageLimit: '20GB'
  }
} as const;

// Security Settings
export const SECURITY_SETTINGS = {
  MAX_DOWNLOAD_SIZE: 100 * 1024 * 1024, // 100MB per download
  MAX_BULK_DOWNLOAD_FILES: 50,
  DOWNLOAD_RATE_LIMIT: 10, // downloads per minute
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  MAX_FAILED_LOGINS: 5
} as const;
