import { useState, useEffect } from "react";
import { beaches } from "../util/beachList";

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
    가: [],
    나: [],
    다: [],
    라: [],
    마: [],
    바: [],
    사: [],
    아: [],
    자: [],
    차: [],
    카: [],
    타: [],
    파: [],
    하: [],
  };

  beaches.forEach(({ num, name }) => {
    const initial = extractInitial(name);
    switch (initial) {
      case "ㄱ":
      case "ㄲ":
        categorized["가"].push({ num, name });
        break;
      case "ㄴ":
        categorized["나"].push({ num, name });
        break;
      case "ㄷ":
      case "ㄸ":
        categorized["다"].push({ num, name });
        break;
      case "ㄹ":
        categorized["라"].push({ num, name });
        break;
      case "ㅁ":
        categorized["마"].push({ num, name });
        break;
      case "ㅂ":
      case "ㅃ":
        categorized["바"].push({ num, name });
        break;
      case "ㅅ":
      case "ㅆ":
        categorized["사"].push({ num, name });
        break;
      case "ㅇ":
        categorized["아"].push({ num, name });
        break;
      case "ㅈ":
      case "ㅉ":
        categorized["자"].push({ num, name });
        break;
      case "ㅊ":
        categorized["차"].push({ num, name });
        break;
      case "ㅋ":
        categorized["카"].push({ num, name });
        break;
      case "ㅌ":
        categorized["타"].push({ num, name });
        break;
      case "ㅍ":
        categorized["파"].push({ num, name });
        break;
      case "ㅎ":
        categorized["하"].push({ num, name });
        break;
      default:
        break;
    }
  });

  return categorized;
};

type Props = {
  beach?: string
  setBeach?: React.Dispatch<React.SetStateAction<string>>; 
}

const BeachList: React.FC<Props> = ({ beach, setBeach }) => {
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);
  const [selectedBeach, setSelectedBeach] = useState<string | null>(null);

  const categorizedBeaches = categorizeBeaches(beaches);

  useEffect(() => {
    if (beach) {
      console.log('Selected beach:', beach);
      setSelectedBeach(beach);  // beach 상태가 업데이트되면 selectedBeach도 업데이트
    }
  }, [beach]);

  return (
    <div className="ml-[100px] mt-4">
      {/* 초성 버튼들 */}
      <div className="mb-4">
        {Object.keys(categorizedBeaches).map((initial) => (
          <button
            key={initial}
            onClick={() => setSelectedInitial(initial)}
            className="mr-[5px] p-2 rounded-md border-blue-200 border-[1px] cursor-pointer"
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
          <p>{selectedInitial}로 시작하는 해수욕장</p>
          {categorizedBeaches[selectedInitial].length > 0 ? (
            categorizedBeaches[selectedInitial].map(({num, name}, index) => (
              <button
                key={index}
                className="mr-[5px] my-[5px] p-[5px] rounded-md cursor-pointer text-xs"
                onClick={() => { 
                  setBeach(name); 
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
