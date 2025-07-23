import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

const App = () => {
  return (
    <RouterProvider router={router} basepath={import.meta.env.VITE_BASE_PATH} />
  )
}

export default App