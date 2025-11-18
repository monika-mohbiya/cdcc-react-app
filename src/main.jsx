import React, { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
// import Login from './pages/Login.jsx'
// import Students from './pages/Students.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
// import AnsKey from './pages/AnsKey.jsx'
const Login = lazy(() => import('./pages/Login.jsx'))
const Students = lazy(() => import('./pages/Students.jsx'))
const AnsKey = lazy(() => import('./pages/AnsKey.jsx'))

const router = createHashRouter([
	{ path: '/', element: <Navigate to="/login" replace /> },
	{ path: '/login', element: <Login /> },
	{
		path: '/students',
		element: (
			<ProtectedRoute>
				<Students />
			</ProtectedRoute>
		),
	},
	{
		path: '/anskey/:enroll',
		element: (
			<ProtectedRoute>
				<AnsKey />
			</ProtectedRoute>
		),
	},
	{ path: '*', element: <Navigate to="/login" replace /> },
])

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={router} />
		</Suspense>
	</StrictMode>
)
