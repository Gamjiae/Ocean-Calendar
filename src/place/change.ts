import * as fs from "fs";
import { aPlaces } from "./a";
import { bPlaces } from "./b";

interface AType {
  stationId: number;
  stationName: string;
  latitude: number;
  longitude: number;
}

interface BType {
  stationId: string;
  stationName: string;
  latitude: number;
  longitude: number;
}

// 두 좌표 간 거리 계산 함수
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;
  const R = 6371; // 지구 반지름 (킬로미터)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// 매핑 함수 (배열 형식 반환)
const mapPlaces = (aPlaces: AType[], bPlaces: BType[]): { name: string, code: string }[] => {
  const mappings: { name: string, code: string }[] = [];

  aPlaces.forEach(aPlace => {
    let closestPlace = bPlaces[0];
    let minDistance = calculateDistance(
      aPlace.latitude, aPlace.longitude,
      closestPlace.latitude, closestPlace.longitude
    );

    bPlaces.forEach(bPlace => {
      const distance = calculateDistance(
        aPlace.latitude, aPlace.longitude,
        bPlace.latitude, bPlace.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestPlace = bPlace;
      }
    });

    mappings.push({
      name: aPlace.stationName,
      code: closestPlace.stationId
    });
  });

  return mappings;
};

// 매핑 생성 및 JSON 파일로 저장
const mappings = mapPlaces(aPlaces, bPlaces);

// JSON 형식으로 변환하여 배열로 저장
fs.writeFileSync("mapping.json", JSON.stringify(mappings, null, 2), "utf-8");

console.log("매핑 데이터를 mapping.json 파일로 저장했습니다.");
