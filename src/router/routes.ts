import Home from "@/views/Home.vue";

export const mainRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/movie/:movieName",
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
