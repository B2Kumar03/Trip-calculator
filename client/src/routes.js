/**
 * Central route path constants for the app.
 * Use these for navigate() and <Link to=""> to keep URLs consistent.
 */
export const ROUTES = {
  // Marketing & onboarding
  LANDING: '/',
  ONBOARDING_SECOND: '/onboarding/2',
  ONBOARDING_THIRD: '/onboarding/3',
  SIGNUP: '/signup',
  LOGIN: '/login',

  // App (after login)
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',

  // Trip
  TRIP_CREATE: '/trip/create',
  TRIP_DETAILS: '/trip/:tripId',
  TRIP_OVERVIEW: '/trip/:tripId/overview',
  TRIP_EXPENSES: '/trip/:tripId/expenses',
  TRIP_SETTLEMENTS: '/trip/:tripId/settlements',
  TRIP_CHAT: '/trip/:tripId/chat',
  TRIP_EXPENSE_NEW: '/trip/:tripId/expense/new',
  TRIP_SETTINGS: '/trip/:tripId/settings',
  TRIP_ADMIN_CONTROLS: '/trip/:tripId/admin',
}

/**
 * Build a path by replacing :param placeholders.
 * @example pathTo(ROUTES.TRIP_DETAILS, { tripId: 'rajasthan-expedition' }) => '/trip/rajasthan-expedition'
 */
export function pathTo(pathPattern, params = {}) {
  let path = pathPattern
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, encodeURIComponent(value))
  })
  return path
}
