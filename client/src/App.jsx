import { useNavigate, useParams, useLocation, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { ROUTES, pathTo } from './routes'
import { getTripBySlug, tripToSlug } from './lib/tripData'
import PageFirst from './pages/marketingpage/PageFirst'
import PageSecond from './pages/marketingpage/PageSecond'
import PageThird from './pages/marketingpage/PageThird'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TripDetails from './pages/TripDetails'
import TripView from './pages/TripView'
import TripChat from './pages/TripChat'
import AddNewExpense from './pages/AddNewExpense'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import CreateTrip from './pages/CreateTrip'
import TripSettings from './pages/TripSettings'
import AdminControls from './pages/AdminControls'

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      {/* Marketing & onboarding */}
      <Route path={ROUTES.LANDING} element={
        <PageFirst
          onContinue={() => navigate(ROUTES.ONBOARDING_SECOND)}
          onSkip={() => navigate(ROUTES.ONBOARDING_THIRD)}
          onSignIn={() => navigate(ROUTES.LOGIN)}
        />
      } />
      <Route path={ROUTES.ONBOARDING_SECOND} element={
        <PageSecond
          onContinue={() => navigate(ROUTES.ONBOARDING_THIRD)}
          onSkip={() => navigate(ROUTES.ONBOARDING_THIRD)}
          onSignIn={() => navigate(ROUTES.LOGIN)}
        />
      } />
      <Route path={ROUTES.ONBOARDING_THIRD} element={
        <PageThird
          onGetStarted={() => navigate(ROUTES.SIGNUP)}
          onBack={() => navigate(ROUTES.ONBOARDING_SECOND)}
          onSignIn={() => navigate(ROUTES.LOGIN)}
        />
      } />
      <Route path={ROUTES.SIGNUP} element={
        <CreateAccount onLogin={() => navigate(ROUTES.LOGIN)} />
      } />
      <Route path={ROUTES.LOGIN} element={
        <Login
          onSignUp={() => navigate(ROUTES.SIGNUP)}
          onLoginSuccess={() => navigate(ROUTES.DASHBOARD)}
        />
      } />

      {/* App (after login) */}
      <Route path={ROUTES.DASHBOARD} element={
        <Dashboard
          onSignOut={() => navigate(ROUTES.LOGIN)}
          onViewProfile={() => navigate(ROUTES.PROFILE)}
          onOpenNotifications={() => navigate(ROUTES.NOTIFICATIONS)}
          onOpenCreateTrip={() => navigate(ROUTES.TRIP_CREATE)}
          onOpenAdminControls={(trip) => {
            const slug = trip?.tripId || tripToSlug(trip?.tripName) || 'rajasthan-expedition'
            navigate(pathTo(ROUTES.TRIP_ADMIN_CONTROLS, { tripId: slug }), { state: { trip } })
          }}
          onOpenTripSettings={(trip) => {
            const slug = trip?.tripId || tripToSlug(trip?.tripName) || 'trip'
            navigate(pathTo(ROUTES.TRIP_SETTINGS, { tripId: slug }), { state: { trip } })
          }}
          onViewTripDetails={(trip, section) => {
            const slug = trip?.tripId || tripToSlug(trip?.tripName) || 'trip'
            if (section === 'settlements') {
              navigate(pathTo(ROUTES.TRIP_SETTLEMENTS, { tripId: slug }), { state: { trip } })
            } else {
              navigate(pathTo(ROUTES.TRIP_DETAILS, { tripId: slug }), { state: { trip } })
            }
          }}
        />
      } />
      <Route path={ROUTES.PROFILE} element={
        <Profile
          onBack={() => navigate(ROUTES.DASHBOARD)}
          onSignOut={() => navigate(ROUTES.LOGIN)}
        />
      } />
      <Route path={ROUTES.NOTIFICATIONS} element={
        <Notifications onBack={() => navigate(ROUTES.DASHBOARD)} />
      } />

      {/* Trip create */}
      <Route path={ROUTES.TRIP_CREATE} element={
        <CreateTrip
          onBack={() => navigate(ROUTES.DASHBOARD)}
          onCreateTrip={(trip) => {
            const slug = trip?.tripId || tripToSlug(trip?.tripName) || 'trip'
            navigate(pathTo(ROUTES.TRIP_DETAILS, { tripId: slug }), { state: { trip } })
          }}
        />
      } />

      {/* Trip scoped (use wrappers to get tripId + trip from URL/state) */}
      <Route path={ROUTES.TRIP_DETAILS} element={<TripDetailsRoute />} />
      <Route path={ROUTES.TRIP_OVERVIEW} element={<TripViewRoute section="overview" />} />
      <Route path={ROUTES.TRIP_EXPENSES} element={<TripViewRoute section="expenses" />} />
      <Route path={ROUTES.TRIP_SETTLEMENTS} element={<TripViewRoute section="settlements" />} />
      <Route path={ROUTES.TRIP_CHAT} element={<TripChatRoute />} />
      <Route path={ROUTES.TRIP_EXPENSE_NEW} element={<AddNewExpenseRoute />} />
      <Route path={ROUTES.TRIP_SETTINGS} element={<TripSettingsRoute />} />
      <Route path={ROUTES.TRIP_ADMIN_CONTROLS} element={<AdminControlsRoute />} />

      {/* Catch-all: redirect unknown paths to landing */}
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  )
}

function useTripFromRoute() {
  const { tripId } = useParams()
  const { state } = useLocation()
  return getTripBySlug(tripId || '', state?.trip)
}

function TripDetailsRoute() {
  const navigate = useNavigate()
  const trip = useTripFromRoute()
  const tripId = useParams().tripId

  return (
    <TripDetails
      onBack={() => navigate(ROUTES.DASHBOARD)}
      onOpenChat={() => navigate(pathTo(ROUTES.TRIP_CHAT, { tripId }), { state: { trip } })}
      onAddExpense={() => navigate(pathTo(ROUTES.TRIP_EXPENSE_NEW, { tripId }), { state: { trip } })}
      onOpenSettlements={() => navigate(pathTo(ROUTES.TRIP_SETTLEMENTS, { tripId }), { state: { trip } })}
      onOpenProfile={() => navigate(ROUTES.PROFILE)}
      onOpenNotifications={() => navigate(ROUTES.NOTIFICATIONS)}
      onOpenAdminControls={() => navigate(pathTo(ROUTES.TRIP_ADMIN_CONTROLS, { tripId }), { state: { trip } })}
      tripName={trip?.tripName}
      tripDates={trip?.tripDates}
      location={trip?.location}
    />
  )
}

const TRIP_VIEW_SECTION_ROUTES = {
  overview: ROUTES.TRIP_OVERVIEW,
  expenses: ROUTES.TRIP_EXPENSES,
  settlements: ROUTES.TRIP_SETTLEMENTS,
}

function TripViewRoute({ section }) {
  const navigate = useNavigate()
  const trip = useTripFromRoute()
  const tripId = useParams().tripId

  const onNavigateToSection = (s) => {
    const path = TRIP_VIEW_SECTION_ROUTES[s]
    if (path) navigate(pathTo(path, { tripId }), { state: { trip } })
  }

  return (
    <TripView
      onBack={() => navigate(pathTo(ROUTES.TRIP_DETAILS, { tripId }), { state: { trip } })}
      onOpenChat={() => navigate(pathTo(ROUTES.TRIP_CHAT, { tripId }), { state: { trip } })}
      onAddExpense={() => navigate(pathTo(ROUTES.TRIP_EXPENSE_NEW, { tripId }), { state: { trip } })}
      onOpenProfile={() => navigate(ROUTES.PROFILE)}
      onOpenDashboard={() => navigate(ROUTES.DASHBOARD)}
      onOpenAdminControls={() => navigate(pathTo(ROUTES.TRIP_ADMIN_CONTROLS, { tripId }), { state: { trip } })}
      onNavigateToSection={onNavigateToSection}
      tripName={trip?.tripName}
      tripDates={trip?.tripDates}
      location={trip?.location}
      travelersCount={trip?.travelersCount ?? 5}
      initialSection={section}
    />
  )
}

function TripChatRoute() {
  const navigate = useNavigate()
  const trip = useTripFromRoute()
  const tripId = useParams().tripId

  return (
    <TripChat
      onBack={() => navigate(pathTo(ROUTES.TRIP_OVERVIEW, { tripId }), { state: { trip } })}
      tripName={trip?.tripName}
      tripDates={trip?.tripDates}
      location={trip?.location}
    />
  )
}

function AddNewExpenseRoute() {
  const navigate = useNavigate()
  const trip = useTripFromRoute()
  const tripId = useParams().tripId

  return (
    <AddNewExpense
      onBack={() => navigate(pathTo(ROUTES.TRIP_EXPENSES, { tripId }), { state: { trip } })}
      tripName={trip?.tripName}
    />
  )
}

function TripSettingsRoute() {
  const navigate = useNavigate()
  const trip = useTripFromRoute()

  return (
    <TripSettings
      onBack={() => navigate(ROUTES.DASHBOARD)}
      onSave={() => navigate(ROUTES.DASHBOARD)}
      tripData={trip}
    />
  )
}

function AdminControlsRoute() {
  const navigate = useNavigate()
  const trip = useTripFromRoute()
  const tripId = useParams().tripId

  return (
    <AdminControls
      onBack={() => navigate(pathTo(ROUTES.TRIP_OVERVIEW, { tripId }), { state: { trip } })}
      tripName={trip?.tripName}
    />
  )
}

export default App
