/**
 * Trip slug <-> trip data for routing.
 * Used when opening a trip by URL (e.g. /trip/rajasthan-expedition) so we have default data.
 */

const TRIPS_BY_SLUG = {
  'rajasthan-expedition': {
    tripId: 'rajasthan-expedition',
    tripName: 'Rajasthan Expedition',
    tripDates: '12 Oct – 20 Oct 2024',
    location: 'Rajasthan, India',
    startDate: 'Oct 12, 2024',
    endDate: 'Oct 20, 2024',
    budget: '50000',
    travelersCount: 4,
  },
  'kerala-getaway': {
    tripId: 'kerala-getaway',
    tripName: 'Kerala Getaway',
    tripDates: '1 Nov – 8 Nov 2024',
    location: 'Kerala, India',
    startDate: 'Nov 1, 2024',
    endDate: 'Nov 8, 2024',
    budget: '50000',
    travelersCount: 3,
  },
  'kerala-road-trip-2024': {
    tripId: 'kerala-road-trip-2024',
    tripName: 'Kerala Road Trip 2024',
    tripDates: 'Dec 15 – Dec 22, 2024',
    location: 'Kerala, India',
    startDate: 'Dec 15, 2024',
    endDate: 'Dec 22, 2024',
    budget: '75000',
    travelersCount: 3,
  },
}

/**
 * Get trip data by slug. Prefer state.trip from navigation state if provided.
 * @param {string} slug - from useParams().tripId
 * @param {object} stateTrip - location.state?.trip
 * @returns {object} trip object with tripName, tripDates, location, etc.
 */
export function getTripBySlug(slug, stateTrip = null) {
  if (stateTrip && (stateTrip.tripId === slug || stateTrip.tripName)) {
    return { ...TRIPS_BY_SLUG[slug], ...stateTrip, tripId: slug }
  }
  const base = TRIPS_BY_SLUG[slug]
  if (base) return { ...base }
  return {
    tripId: slug,
    tripName: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    tripDates: '',
    location: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelersCount: 0,
  }
}

/**
 * Convert trip name to URL slug (e.g. "Rajasthan Expedition" -> "rajasthan-expedition").
 */
export function tripToSlug(tripName) {
  if (!tripName) return 'trip'
  return tripName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
