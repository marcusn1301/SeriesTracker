import React from "react";

import { ContentContainerOuter, PickUp, Filter, GridTypeIcons, Icon, ContentContainerGrid } from "./ContentStyles";

import Card from "../Card/Card";
import ContentRight from "../ContentRight/ContentRight";
import Sidebar from "../Sidebar/Sidebar";

import filter from "../../Assets/Content/Adjust.svg";
import rowView from "../../Assets/Content/Playlist.svg";
import iconView from "../../Assets/Content/Apps.svg";

import loffi from "../../Assets/Images/loffi.png";

const Content = () => {
  return (
    <>
      <ContentContainerOuter>
        <Sidebar />
        <PickUp>
          Pick up where you left
          <Filter src={filter} />
          <GridTypeIcons>
            <Icon src={rowView} />
            <Icon src={iconView} />
          </GridTypeIcons>
        </PickUp>
        <ContentContainerGrid>
          <Card />
          <Card />
          <Card />
          <Card />
        </ContentContainerGrid>
        <ContentRight />
      </ContentContainerOuter>
    </>
  );
};

export default Content;
