import React from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import Header from "../../../components/Home/Header";
import Events from "../../../components/events/Events";
import TeamArea from "../../../components/HomeTwo/TeamArea";
import HomeTwoFooter from "../../../components/HomeTwo/HomeTwoFooter";
import SEO from "../../../components/seo";

const OurEvents = () => {
  return (
    <>
      <SEO pageTitle="Event" />
      <Header />
      <BreadCrumb title="Event" subtitle="Event" />
      <Events />
      <TeamArea />
      <HomeTwoFooter />
    </>
  );
};

export default OurEvents;
