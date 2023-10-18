import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { base_url } from '../../config';

export const apiSlice = createApi({
  reducerPath:'api',
  baseQuery:fetchBaseQuery({
    baseUrl:`${base_url}/api/v1`
  }),
  tagTypes:[],
  keepUnusedDataFor:600,
  endpoints:(builder) => ({
    getCourses:builder.query({
      query:() => '/all_courses'
    }),
    getBlogs:builder.query({
      query:() => '/blog'
    }),
    getEvents:builder.query({
      query:() => '/events'
    }),
    getTeams:builder.query({
      query:() => '/teams'
    }),
    // single blog
    getBlog:builder.query({
      query:(id) => `/blog/${id}`
    }),
    // single team 
    getTeam:builder.query({
      query:(id) => `/team/${id}`
    }),
    // single event
    getEvent:builder.query({
      query:(id) => `/event/${id}`
    }),
    // single course
    getCourse:builder.query({
      query:(id) => `/get_course/${id}`
    }),
    // category get
    getCategory:builder.query({
      query:(category) => `/category/${category}`
    }),
    getMyCourses:builder.query({
      query:(email) => `/myOrder/${email}`
    }),
  })
})

export const {useGetCoursesQuery,useGetBlogsQuery,useGetBlogQuery,useGetEventsQuery,useGetMyCoursesQuery,
useGetTeamsQuery,useGetTeamQuery,useGetEventQuery,useGetCourseQuery,useGetCategoryQuery} = apiSlice;