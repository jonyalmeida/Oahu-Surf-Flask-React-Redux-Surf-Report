import { parseReport } from "../../components/utils/utils";

export const GET_TEXT_REPORT = "GET_TEXT_REPORT";

export function getReports(island) {
    return async (dispatch) => {
        const response = await fetch(
            "https://thingproxy.freeboard.io/fetch/https://forecast.weather.gov/product.php?site=NWS&issuedby=HFO&product=SRF&format=txt&version=1&glossary=0"
        );
        const data = await response.text();

        let parse = data.split("\n").filter((item) => item);
        //extract surf report
        const report = parseReport(parse, island);
        dispatch(sendReport(report));
    };
}

export function sendReport(report) {
    return { type: GET_TEXT_REPORT, report };
}
