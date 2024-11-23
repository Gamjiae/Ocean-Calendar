import { useState } from "react";
import { beaches } from "../util/beachList";
import { useBeachStore } from "../util/useStore";

// 초성 추출 함수
const extractInitial = (word: string): string => {
  var init = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  var iSound = '';
  var index = Math.floor(((word.charCodeAt(0) - 44032) / 28) / 21);
  if (index >= 0) {
    iSound += init[index];
  }

  return iSound;
};

// 해수욕장들을 초성에 맞게 분류하는 함수
const categorizeBeaches = (beaches: { num: number; name: string }[]) => {
  const categorized: { [key: string]: { num: number; name: string }[] } = {
    ㄱ: [],
    ㄴ: [],
    ㄷ: [],
    ㄹ: [],
    ㅁ: [],
    ㅂ: [],
    ㅅ: [],
    ㅇ: [],
    ㅈ: [],
    ㅊ: [],
    ㅋ: [],
    ㅌ: [],
    ㅍ: [],
    ㅎ: [],
  };

  beaches.forEach(({ num, name }) => {
    const initial = extractInitial(name);
    switch (initial) {
      case "ㄱ":
      case "ㄲ":
        categorized["ㄱ"].push({ num, name });
        break;
      case "ㄴ":
        categorized["ㄴ"].push({ num, name });
        break;
      case "ㄷ":
      case "ㄸ":
        categorized["ㄷ"].push({ num, name });
        break;
      case "ㄹ":
        categorized["ㄹ"].push({ num, name });
        break;
      case "ㅁ":
        categorized["ㅁ"].push({ num, name });
        break;
      case "ㅂ":
      case "ㅃ":
        categorized["ㅂ"].push({ num, name });
        break;
      case "ㅅ":
      case "ㅆ":
        categorized["ㅅ"].push({ num, name });
        break;
      case "ㅇ":
        categorized["ㅇ"].push({ num, name });
        break;
      case "ㅈ":
      case "ㅉ":
        categorized["ㅈ"].push({ num, name });
        break;
      case "ㅊ":
        categorized["ㅊ"].push({ num, name });
        break;
      case "ㅋ":
        categorized["ㅋ"].push({ num, name });
        break;
      case "ㅌ":
        categorized["ㅌ"].push({ num, name });
        break;
      case "ㅍ":
        categorized["ㅍ"].push({ num, name });
        break;
      case "ㅎ":
        categorized["ㅎ"].push({ num, name });
        break;
      default:
        break;
    }
  });

  return categorized;
};

const BeachList: React.FC = () => {
  const { setBeach } = useBeachStore();
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);
  const [selectedBeach, setSelectedBeach] = useState<string | null>(null);

  const categorizedBeaches = categorizeBeaches(beaches);

  return (
    <div className="ml-[100px] my-4">
      {/* 초성 버튼들 */}
      <div className="mb-4">
        {Object.keys(categorizedBeaches).map((initial) => (
          <button
            key={initial}
            onClick={() => setSelectedInitial(initial)}
            className="mr-[10px] h-[30px] px-[5px] rounded-md border-blue-200 border-[1px] cursor-pointer"
            style={{
              backgroundColor: selectedInitial === initial ? "#bae6fd" : "#f0f9ff",
            }}
          >
            {initial}
          </button>
        ))}
      </div>

      {/* 선택된 초성에 해당하는 해수욕장 버튼 리스트 */}
      {selectedInitial && (
        <div className="text-sm">
          {categorizedBeaches[selectedInitial].length > 0 ? (
            categorizedBeaches[selectedInitial].map(({num, name}, index) => (
              <button
                key={index}
                className="mr-[5px] my-[5px] p-[5px] rounded-md cursor-pointer text-xs"
                onClick={() => { 
                  setBeach(name, num); 
                  setSelectedBeach(name); 
                  console.log(`Selected brach num: ${num}`)
                }}
                style={{
                  backgroundColor: selectedBeach === name ? "#cbd5e1" : "#e2e8f0"
                }}
              >
                {name}
              </button>
            ))
          ) : (
            <p className="text-sm">해당 초성으로 시작하는 해수욕장이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BeachList;
