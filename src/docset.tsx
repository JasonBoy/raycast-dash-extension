import { SingleDocsetSearch } from "./views";
import { DashArguments } from "./types";
import { useDocsets } from "./hooks";
import { useEffect, useState } from "react";
import { Action, ActionPanel, environment, List, open } from "@raycast/api";
import { getDocsetByKeyword, getFilteredDocsets } from "./utils";
import useDashApp from "./hooks/useDashApp";
import OpenInBrowserAction from "./components/OpenInBrowserAction";

export default function Command(props: { arguments?: DashArguments }) {
  const qs = (props.arguments || {}) as DashArguments;
  const { docset, searchstring } = qs;
  const [searchText, setSearchText] = useState(searchstring || "");
  const [dashApp, isDashAppLoading] = useDashApp();
  const [docsets, isLoadingDocsets] = useDocsets();
  const filteredDocsets = getFilteredDocsets(docsets, docset || "");
  const matchedDocset = getDocsetByKeyword(docsets, docset || "");
  const isLoading = isDashAppLoading || isLoadingDocsets;

  useEffect(() => {
    console.log("environment: ", environment);
    console.log("props: ", props);
    console.log("isLoadingDocsets: ", isLoadingDocsets);
    console.log("dashApp: ", dashApp);

    if (filteredDocsets?.length) {
      console.log(
        "filteredDocsets: ",
        filteredDocsets.map((item) => {
          return {
            docsetName: item.docsetName,
            keyword: item.keyword,
          };
        })
      );
    }
    console.log("matchedDocset: ", matchedDocset);
  }, [filteredDocsets]);

  if (!docset || !matchedDocset || isLoading) {
    return (
      <List isLoading={isLoadingDocsets}>
        <List.EmptyView
          title={`${docset} docset not found`}
          description={`You need to set a keyword for the docset in Dash app to use this command`}
          icon="empty-view-icon.png"
          actions={
            <ActionPanel title="dash actions">
              {dashApp ? <Action title="Open Dash" onAction={() => open(dashApp.path)} /> : <OpenInBrowserAction />}
            </ActionPanel>
          }
        />
      </List>
    );
  }

  return <SingleDocsetSearch docset={matchedDocset} searchstring={searchText} />;
}
