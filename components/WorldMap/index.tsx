import React, { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";
import { useCountryPostCounts } from "../../utils/supabase/db";
import ErrorDataLayout from "../../components/Scaffolds/ErrorDataScaffold";
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface WorldMapProps {
  className?: string;
}

export default function WorldMap(props: WorldMapProps) {
  const { className } = props;

  const { countryPostCountData, error } = useCountryPostCounts();
  const [tooltipContent, setTooltipContent] = useState("");
  const colorScale = useMemo(
    () =>
      scaleLinear<string>()
        .domain([
          countryPostCountData?.minPostCount ?? 0,
          countryPostCountData?.maxPostCount ?? 0,
        ])
        .range(["#ffedea", "#ff5233"]),
    [countryPostCountData?.maxPostCount, countryPostCountData?.minPostCount]
  );

  return (
    <ErrorDataLayout error={error} data={countryPostCountData}>
      <ComposableMap
        data-tip=""
        className={className}
        projectionConfig={{ scale: 147, rotate: [-10, 0, 0] }}
        height={390}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} id={""} fill="white" />
        {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryPostCount =
                countryPostCountData?.countryPostCounts?.get(
                  geo.properties.ISO_A2
                );

              const fill = countryPostCount
                ? colorScale(countryPostCount)
                : "#fff4f2";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#D6D6DA"
                  strokeWidth={0.4}
                  style={{
                    default: {
                      fill: fill,
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(
                      `${NAME} — ${countryPostCount ?? 0} posts`
                    );
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </ErrorDataLayout>
  );
}
