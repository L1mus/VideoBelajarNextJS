import React from "react";
import Navbar from "../components/navigation/Navbar";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Navigation/Navbar",
  component: Navbar,
  argTypes: {
    isLoggedIn: { control: "boolean" },
    navType: {
      control: {
        type: "select",
        options: ["main", "payment", "course"],
      },
    },
    progress: { control: { type: "range", min: 0, max: 100, step: 10 } },
    currentStep: { control: { type: "number", min: 0, max: 2 } },
  },
};

const Template = (args) => <Navbar {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  isLoggedIn: false,
  navType: "main",
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isLoggedIn: true,
  navType: "main",
};

export const PaymentProgress = Template.bind({});
PaymentProgress.args = {
  isLoggedIn: true,
  navType: "payment",
  currentStep: 1,
};

export const CourseNavigation = Template.bind({});
CourseNavigation.args = {
  isLoggedIn: true,
  navType: "course",
  progress: 80,
};
