import React from "react";
import { useSelector } from "react-redux";
import EventArea from "../../../components/EventDetails/EventArea";
import EventDetailsArea from "../../../components/EventDetails/EventDetailsArea";
import Header from "../../../components/Home/Header";
import HomeTwoFooter from "../../../components/HomeTwo/HomeTwoFooter";
import SEO from "../../../components/seo";

const EventDetails = () => {
  return (
    <>
      <SEO pageTitle="Event Details" />
      <Header />
      <EventArea />
      <EventDetailsArea />
      <HomeTwoFooter />
    </>
  );
};

export default EventDetails;
