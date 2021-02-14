import Home from "@/views/Home.vue";

export const mainRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserMoviesView.vue")
  },
  {
    path: "/movie/:movieId",
    name: "Movie",
    component: () =>
      import(
        /* webpackChunkName: "MovieDetailsView" */ "../views/MovieDetailsView.vue"
      ),
    props: (route: { query: any; params: any }) => ({
      ...route.query,
      ...route.params
    })
  }
];
