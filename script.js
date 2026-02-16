const KAKAO_API_KEY = '14302bcc718209aaa470793e426fbb2a';
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) Kakao.init(KAKAO_API_KEY);
const P = {
    '甲': {
        base: "애기동자님이 네게 말씀하시길, '너는 장군신의 기운을 타고나, 그 기세가 등등하구나.' 어디를 가든 대장 노릇을 해야 직성이 풀리니, 그 모습이 마치 칼을 든 장수와 같다. 하지만 그 강한 기운 탓에 주변에 적이 많고, 몸에 살(煞)이 끼기 쉬우니 조심해야 한다. 특히 대장, 소장 등 소화기 계통이 약하니, 찬 음식을 피하고 항상 배를 따뜻하게 하거라.",
        love: "네 사랑은 마치 불과 같아서, 한번 타오르면 모든 것을 태울 듯이 뜨겁구나. 하지만 상대방의 기를 너무 누르려 하니, 결국 그 사람이 지쳐 떠나갈 수 있다. 애기동자님이 보시기에, 너의 강한 기운을 받아줄 수 있는 사람은 물(水)의 기운을 가진 사람이니, 그런 인연을 찾아보거라.",
        money: "재물은 들어오나, 그만큼 나가는 구멍도 크다. 특히 사람을 너무 믿어 돈을 빌려주거나 투자를 하면, 관재수에 휘말릴 수 있으니 각별히 주의해야 한다. 애기동자님이 네 조상님을 뵈니, 재물 복을 막고 있는 조상이 있구나. 가까운 시일 내에 조상굿을 하여 맺힌 한을 풀어주는 것이 좋겠다.",
        work: "남 밑에서 일할 팔자가 아니다. 네 스스로 사업을 하거나, 최소한 조직의 우두머리는 되어야 그 기운이 풀린다. 애기동자님이 오방기를 뽑아보니, 붉은 기와 흰 기가 함께 나왔다. 이는 너에게 권력과 명예가 따름을 의미하지만, 그 과정에서 구설수가 많을 것이니 항상 입을 조심해야 한다.",
        advice: "애기동자님의 공수가 내려왔다. '네가 쥔 칼은 남을 벨 수도, 너를 벨 수도 있느니라.' 그 강한 기운을 남을 위해 쓰는 지혜를 길러라. 그리고 네 등 뒤에서 너를 돕는 몸주신께 항상 감사하는 마음을 가져야, 앞으로의 길이 평탄할 것이다."
    },
    '乙': {
        base: "애기동자님이 네게 말씀하시길, '너는 산신령 아래 피어난 한 떨기 꽃과 같구나.' 겉보기엔 연약해 보여도, 바위틈에서도 살아남는 강인한 생명력을 지녔다. 하지만 이리저리 휘둘리기 쉬워 마음에 상처를 많이 받으니, 네 중심을 바로 세워야 한다. 특히 신경이 예민하여 두통이나 불면증에 시달릴 수 있으니, 자기 전 따뜻한 차 한잔으로 몸을 달래주거라.",
        love: "사랑에 있어서는 상대에게 모든 것을 맞춰주려 하는구나. 헌신적인 모습은 아름답지만, 때로는 그 마음에 응답 없는 이에게 상처받아 혼자 눈물 흘리는 모습이 보이는구나. 애기동자님이 보시기에, 너를 아껴주고 지켜줄 수 있는 듬직한 나무(木)의 기운을 가진 사람이 네 인연이다.",
        money: "재물을 모으는 능력은 있으나, 정에 이끌려 손해를 보는 경우가 잦다. '이것만 빌려달라', '조금만 투자해달라'는 말을 거절하지 못해 네 곳간이 비는 형국이다. 애기동자님이 보기에 너는 조상 덕이 있는 팔자이니, 조상님들께 정성껏 제를 올리면 재물운이 트일 것이다.",
        work: "조직 생활에 잘 적응하고 윗사람의 예쁨을 받으나, 네 공을 남에게 뺏기기 쉽다. 남 좋은 일만 시키다 정작 너는 아무것도 얻지 못할 수 있다. 애기동자님이 네게 주는 비방은, 작은 성공이라도 주변에 알려 너의 존재감을 드러내는 것이다. 그래야 귀인이 너를 알아보고 끌어준다.",
        advice: "애기동자님의 공수가 내려왔다. '아무리 작은 꽃이라도, 스스로 빛나야 벌과 나비가 찾아오는 법.' 남의 눈치를 보기보다 너의 아름다움을 먼저 생각하라. 너는 충분히 사랑받을 자격이 있는 귀한 사람이다."
    },
    '丙': {
        base: "애기동자님이 말씀하시길, '네 몸에는 태양신이 깃들어 있구나.' 그 기운이 너무 밝아 주변에 사람이 끊이지 않고, 인기가 많다. 하지만 그 빛이 너무 강렬하여 때로는 다른 사람의 기를 죽이고, 자신도 모르게 오만한 모습을 보일 때가 있다. 심장과 혈압에 화기(火氣)가 몰려있으니, 급하게 화를 내거나 흥분하는 것을 경계해야 한다.",
        love: "사랑을 할 때도 온 세상을 다 가진 것처럼 요란하고 화려하게 하는구나. 모두가 너의 사랑을 알게 되지만, 그만큼 구설도 따르기 쉽다. 애기동자님이 보기에, 너의 불같은 사랑을 때로는 식혀주고, 때로는 더 타오르게 할 수 있는 지혜로운 흙(土)의 기운을 가진 사람이 필요하다.",
        money: "버는 만큼 쓰는 기질이 강해, 재물이 쌓일 틈이 없다. 특히 유흥이나 사람을 만나는 데 돈을 아끼지 않는구나. 애기동자님이 보니, 네게는 돈을 따라다니는 '재물신'보다는 사람을 따라다니는 '인복신'이 더 강하다. 주변 사람들을 귀하게 여기면, 그들이 곧 재물을 가져다줄 것이다.",
        work: "너는 무대 위에서 빛을 발할 운명이다. 사람들 앞에 나서서 말하고, 노래하고, 가르치는 일에서 큰 성공을 거둘 것이다. 애기동자님이 방울을 흔들어보니, '성공'이라는 괘가 나왔다. 하지만 그 성공 뒤에는 시기와 질투가 따르니, 항상 겸손한 마음을 잃지 말아야 한다.",
        advice: "애기동자님의 공수가 내려왔다. '태양은 세상을 비추지만, 스스로의 그림자는 돌아보지 못한다.' 화려한 삶 속에서도 항상 너의 내면을 살피고, 어두운 곳에 있는 사람들을 돌보는 마음을 가져야 신령님께서 더 큰 복을 내려주실 것이다."
    },
    '丁': {
        base: "애기동자님이 네게 말씀하시길, '너는 옥황상제님 앞을 밝히는 촛불의 운명을 타고났구나.' 겉으로는 조용하고 차분해 보이지만, 그 속에는 누구보다 뜨거운 열정과 집념이 숨어있다. 한번 마음먹은 것은 끝까지 파고드는 힘이 있으나, 그 집념이 원한으로 바뀌면 무섭게 변할 수 있다. 눈에 살(煞)이 껴있으니, 눈 건강에 유의하고, 밤늦게 책을 보거나 전자기기를 오래 사용하는 것을 피해야 한다.",
        love: "사랑에 빠지면 제 한 몸을 다 태워 상대를 위하는 헌신적인 사랑을 한다. 하지만 질투심과 의심이 많아, 한번 틀어지면 걷잡을 수 없이 상대를 괴롭히는구나. 애기동자님이 보시기에, 너의 여린 마음을 알아주고 보듬어줄 수 있는 따뜻한 불(火)의 기운을 가진 사람이 네게 맞다.",
        money: "재물을 차곡차곡 모으는 알뜰함이 몸에 배어있다. 하지만 한번씩 크게 씀씀이가 터질 때가 있는데, 주로 남을 위해 돈을 쓸 때 그렇다. 애기동자님이 보니, 네 조상 중에 억울하게 돌아가신 분이 있어 재물 길을 막고 있다. 넋을 위로하는 살풀이 굿을 한번 하는 것이 좋겠다.",
        work: "너는 정신적인 세계를 다루는 일에 특별한 재능이 있다. 종교, 철학, 예술, 상담 분야에서 이름을 날릴 것이다. 애기동자님이 신칼을 잡아보니, '귀인'의 도움이 점쳐진다. 너의 재능을 알아보고 이끌어줄 윗사람을 만나게 될 것이니, 항상 예의를 잃지 마라.",
        advice: "애기동자님의 공수가 내려왔다. '촛불은 제 몸을 태워야 빛을 내지만, 너무 빨리 타버리면 일찍 꺼지는 법이다.' 남을 위해 희생하는 것도 좋지만, 너 자신을 먼저 아끼고 사랑해야 한다. 네 안의 어둠을 보듬어줄 때, 너의 빛은 더욱 멀리 퍼져나갈 것이다."
    },
    '戊': {
        base: "애기동자님이 말씀하시길, '너는 산신(山神)의 굳건한 기운을 이어받았다.' 바위처럼 듬직하고 신의가 있어 주변 사람들이 너를 믿고 의지한다. 하지만 고집이 너무 세고 변화를 싫어하여, 새로운 것을 받아들이지 못하는 우를 범할 수 있다. 위장, 비장 등 소화기 계통이 약점으로 보이니, 과식이나 폭식을 피하고 규칙적인 식사를 해야 한다.",
        love: "사랑에 있어서는 한번 마음을 주면 변치 않는 바위와 같다. 표현은 서툴러도 그 마음은 누구보다 깊고 진실하다. 애기동자님이 보시기에, 너의 무뚝뚝함을 애교로 받아주고, 너의 굳은 마음을 녹여줄 수 있는 부드러운 흙(土)의 기운을 가진 사람이 천생연분이다.",
        money: "네 재물은 땅과 관련이 깊다. 부동산이나 토지에 투자하면 큰 부를 이룰 운이다. 투기보다는 안정적인 것을 선호하니, 재물이 한번 들어오면 쉽게 나가지 않는다. 애기동자님이 보니, 네 집터에 재물복을 관장하는 터줏대감이 좌정하고 계신다. 이사를 자주 다니지 않는 것이 좋다.",
        work: "너는 사람과 사람 사이를 연결하고 중재하는 역할에 하늘이 내린 재능이 있다. 신용을 바탕으로 하는 일이 너의 천직이다. 애기동자님이 오방기를 뽑으니, 노란 기가 나왔다. 이는 중앙, 즉 중심을 의미하니, 어느 조직에 가든 중심인물이 될 운명이다. 다만 너무 앞서가지 말고, 항상 중간을 지키는 지혜가 필요하다.",
        advice: "애기동자님의 공수가 내려왔다. '큰 산은 메아리를 통해 세상과 소통하는 법이다.' 너의 깊은 속마음을 조금은 드러내 보여라. 네가 먼저 마음을 열지 않으면, 아무도 너의 진심을 알아주지 못한다. 주변의 소리에 귀를 기울일 때, 너는 더 큰 산이 될 수 있다."
    },
    '己': {
        base: "애기동자님이 말씀하시길, '너는 만물을 길러내는 성모신의 기운을 가졌구나.' 누구에게나 따뜻하고 다정하며, 자기 사람을 챙기는 마음이 지극하다. 하지만 내 사람과 아닌 사람의 구분이 너무 확실하여, 한번 정을 떼면 뒤도 돌아보지 않는 냉정함이 있다. 피부나 소화기 계통에 탈이 나기 쉬우니, 자극적인 음식을 피하고 몸을 항상 따뜻하게 유지해야 한다.",
        love: "사랑에 있어서는 어머니와 같은 마음으로 상대를 보살피고 챙겨준다. 안정적인 가정을 꾸리는 것을 최고의 행복으로 생각한다. 애기동자님이 보시기에, 너의 이런 헌신적인 사랑을 당연하게 여기지 않고, 함께 가정을 일구어 나갈 책임감 있는 쇠(金)의 기운을 가진 사람이 네 배필이다.",
        money: "재물을 모으는 데는 일가견이 있으나, 귀가 얇아 사기를 당하거나 손재수를 겪을 수 있다. 특히 '쉽게 돈을 벌 수 있다'는 유혹에 넘어가기 쉬우니 조심해야 한다. 애기동자님이 보니, 네 주변에 너의 재물을 시기하는 기운이 보인다. 소금을 몸에 지니고 다니면 나쁜 기운을 막는 데 도움이 될 것이다.",
        work: "너는 사람을 키우고, 가르치고, 돌보는 일에 큰 보람을 느낀다. 교육, 복지, 의료 분야가 너의 길이다. 애기동자님이 방울을 흔들어보니, '문서' 운이 강하게 들어왔다. 이는 합격, 승진, 계약 등 문서와 관련된 좋은 소식이 있을 것을 의미한다. 포기하지 말고 정진하라.",
        advice: "애기동자님의 공수가 내려왔다. '좋은 밭도 한 해 농사를 지으면 쉬어야 하는 법.' 주변 사람을 챙기는 것도 좋지만, 그 전에 너 자신부터 돌보아라. 네가 행복해야, 다른 사람에게도 진정한 행복을 나눠줄 수 있음을 명심해야 한다."
    },
    '庚': {
        base: "애기동자님이 네게 이르시길, '너는 무쇠로 만든 칼을 들고 있는 장군의 상이다.' 의리가 넘치고 불의를 보면 참지 못하는구나. 하지만 그 기운이 너무 강하고 날카로워, 좋은 뜻으로 한 말과 행동이 남에게는 상처가 될 수 있다. 뼈와 관절에 살(煞)이 있으니, 젊을 때부터 몸을 아끼고 뼈 건강에 신경 써야 한다.",
        love: "사랑 표현이 서툴고 무뚝뚝하지만, 한번 내 사람이다 싶으면 목숨 걸고 지키는 의리가 있다. 밀고 당기기 같은 것은 적성에 맞지 않아, 좋으면 좋다, 싫으면 싫다, 솔직하게 표현한다. 애기동자님이 보시기에, 너의 거친 면모를 부드럽게 감싸주고, 너의 진심을 알아주는 지혜로운 물(水)의 기운을 가진 사람을 만나야 한다.",
        money: "재물운은 '모 아니면 도'다. 큰돈을 벌 기회가 자주 찾아오지만, 그만큼 크게 잃을 위험도 따른다. 권력이나 명예를 좇으면 재물은 저절로 따라오는 운명이다. 애기동자님이 보니, 네게는 객사한 조상이 있어 일이 될만하면 엎어지는 액운이 따른다. 객사한 조상을 위로하는 굿을 통해 이 액운을 풀어야 한다.",
        work: "너는 군인, 경찰, 검찰과 같이 권력을 쥐고 기강을 바로 세우는 직업이 천직이다. 강한 카리스마로 사람들을 이끌지만, 윗사람과 자주 부딪히는 것이 흠이다. 애기동자님이 신칼을 뽑아보니, '피'를 보는 괘가 나왔다. 이는 수술이나 사고를 의미할 수도 있지만, 나쁜 기운을 베어내고 새롭게 태어남을 의미하기도 하니, 변화를 두려워 마라.",
        advice: "애기동자님의 공수가 내려왔다. '잘 드는 칼도 칼집에 넣어둘 때가 필요한 법이다.' 너의 강한 기운을 항상 밖으로만 표출하지 말고, 안으로 다스리는 법을 배워라. 진정한 강함은 힘을 쓰는 것이 아니라, 그 힘을 조절하는 지혜에서 나온다."
    },
    '辛': {
        base: "애기동자님이 네게 말씀하시길, '너는 선녀의 보석함에 들어있는 날카로운 보석과 같구나.' 자존심이 강하고 완벽을 추구하며, 흐트러진 것을 용납하지 못한다. 그 예리함으로 남들이 못 보는 것을 보지만, 너무 예민하여 스스로를 괴롭히는구나. 폐, 기관지에 찬 기운이 들어오기 쉬우니, 항상 목을 따뜻하게 보호해야 한다.",
        love: "사랑에 있어서는 백마 탄 왕자, 하늘에서 내려온 선녀를 기다리는구나. 너의 높은 기준에 맞는 사람을 찾기 어려워 연애를 시작하기가 힘들다. 하지만 한번 마음을 열면, 보석처럼 빛나는 사랑을 보여주려 노력한다. 애기동자님이 보시기에, 너의 까다로움을 칭찬으로 받아주고, 너의 예민함을 존중해주는 넓은 땅(土)의 기운을 가진 사람이 어울린다.",
        money: "가치 있는 것을 알아보는 눈이 뛰어나 재테크에 소질이 있다. 하지만 네 품위를 유지하기 위해 쓰는 돈이 만만치 않구나. 명품이나 사치품을 너무 밝히면 재물이 모이지 않는다. 애기동자님이 보니, 네게는 '도화살(桃花煞)'이 강하게 끼어있다. 이 살(煞)은 인기를 끌어 재물을 벌게도 하지만, 반대로 이성 문제로 재물을 잃게도 하니, 이성 관계를 조심해야 한다.",
        work: "너는 섬세함과 정확성을 요구하는 전문직에 어울린다. 법률, 의료, 금융, 예술 분야에서 크게 성공할 수 있다. 애기동자님이 오방기를 뽑으니, 흰 기가 나왔다. 이는 결실과 마무리를 의미하니, 오랫동안 끌어오던 일이 있다면 올해 안에 좋은 결과를 맺게 될 것이다.",
        advice: "애기동자님의 공수가 내려왔다. '보석은 닦을수록 빛나지만, 너무 닦으면 닳아 없어지는 법.' 완벽함에 대한 강박을 조금 내려놓아라. 세상의 모든 것이 네 기준에 맞을 수는 없다. 너 자신에게 조금 더 너그러워질 때, 너의 영혼은 더욱 찬란하게 빛날 것이다."
    },
    '壬': {
        base: "애기동자님이 네게 이르시길, '너는 용왕님의 부름을 받는 깊은 바다와 같구나.' 그 속을 아무도 알 수 없고, 생각이 자유로워 어디에도 얽매이지 않는다. 지혜가 넘치고 창의적이지만, 한 가지 일을 끝까지 마무리 짓지 못하는 것이 흠이다. 신장, 방광 등 수(水) 계통의 기운이 약하니, 물을 많이 마시되, 너무 차가운 물은 피해야 한다.",
        love: "사랑에 있어서는 자유로운 영혼이라, 구속을 싫어하고 친구 같은 연애를 원한다. 여러 사람에게 친절하여 바람둥이로 오해받기 쉬우나, 정작 진짜 마음을 주는 데는 인색하다. 애기동자님이 보시기에, 너의 자유로운 영혼을 이해해주고 함께 여행할 수 있는 바람(木)의 기운을 가진 사람이 너의 짝이다.",
        money: "재물운은 파도와 같아, 한번에 큰돈이 들어왔다가 순식간에 사라지기를 반복한다. 해외와 인연이 깊어, 무역이나 해외 관련 사업으로 큰돈을 벌 수 있다. 애기동자님이 보니, 네 조상 중에 물에 빠져 돌아가신 조상(수살귀)이 있어, 재물이 모일만하면 물거품처럼 사라지게 만든다. 물가에 가서 용왕님께 지극정성으로 빌어보는 것이 좋다.",
        work: "너는 한 곳에 머무는 직장보다는, 세상을 떠돌며 일하는 역마(驛馬)의 기운이 강하다. 변화가 많고 머리를 쓰는 기획, 아이디어, 컨설팅 분야가 어울린다. 애기동자님이 방울을 흔들어보니, '떠나라'는 괘가 나왔다. 현재 있는 곳에 미련을 두지 말고, 새로운 곳으로 옮겨야 운이 트일 것이다.",
        advice: "애기동자님의 공수가 내려왔다. '깊은 바다는 모든 것을 품지만, 스스로의 중심을 잃지 않는다.' 이리저리 떠도는 것도 좋지만, 너의 지혜를 담아둘 그릇을 만들어라. 시작한 일은 끝을 맺는 습관을 들일 때, 너의 지혜는 비로소 세상을 이롭게 하는 보물이 될 것이다."
    },
    '癸': {
        base: "애기동자님이 말씀하시길, '너는 하늘에서 내리는 단비와 같아, 만물을 적시고 생명을 주는구나.' 조용하고 인정이 많아, 보이지 않는 곳에서 남을 돕는다. 하지만 생각이 너무 많고 감성적이라, 현실 감각이 떨어질 때가 많다. 몸에 냉(冷)한 기운이 돌아, 손발이 차고 우울감에 빠지기 쉬우니, 항상 몸을 따뜻하게 하고 햇볕을 자주 쬐어야 한다.",
        love: "사랑에 있어서는 순수하고 낭만적이지만, 그만큼 상처도 받기 쉽다. 말없이 혼자 서운해하다가 돌아서는 경우가 많아, 상대방은 이유도 모르고 너를 떠나보내게 된다. 애기동자님이 보시기에, 너의 여린 감성을 이해해주고, 너의 눈물을 닦아줄 수 있는 따뜻한 흙(土)의 기운을 가진 사람이 필요하다.",
        money: "재물을 모으는 것보다는 정신적인 가치를 더 중요하게 생각하는구나. 돈 욕심이 없어 큰 부자는 되기 어려우나, 평생 돈 때문에 굶지는 않을 팔자다. 애기동자님이 보니, 네게는 남을 돕다 손해를 보는 기운이 있다. 인정에 이끌려 보증을 서거나 돈을 빌려주는 일은 절대로 해서는 안 된다.",
        work: "너는 사람의 마음을 어루만지는 일에 특별한 재능이 있다. 종교, 상담, 예술, 교육 분야에서 사람들에게 빛이 되어줄 운명이다. 애기동자님이 신칼을 뽑으니, '활인(活人)'이라는 괘가 나왔다. 이는 사람을 살리는 일을 해야 너의 업보가 풀리고 운이 트인다는 의미다.",
        advice: "애기동자님의 공수가 내려왔다. '고인 물은 썩고, 흐르는 물은 생명을 만든다.' 너의 그 깊은 생각과 자애로운 마음을 세상에 펼쳐 보여라. 머릿속으로만 세상을 구원하지 말고, 작은 행동 하나라도 실천으로 옮길 때, 너는 마른 땅을 적시는 단비처럼 귀한 존재가 될 것이다."
    }
};
const TEN_GODS = {
    'Bi-gyeon': { name: '비견(比肩)', keywords: ['자존감', '경쟁', '독립'], desc: '나와 같은 기운이 들어오는 시기입니다. 주관이 뚜렷해지고 자신감이 넘치지만, 고집이 세져 주변과 마찰이 생길 수 있습니다. 경쟁보다는 협력을 택하세요.' },
    'Geop-jae': { name: '겁재(劫財)', keywords: ['승부욕', '지출', '도전'], desc: '경쟁심이 불타오르는 시기입니다. 의외의 지출이나 손재수가 있을 수 있으니 지갑을 닫으세요. 하지만 승부수를 띄우기엔 좋은 날입니다.' },
    'Sik-sin': { name: '식신(食神)', keywords: ['표현', '여유', '먹을복'], desc: '의식주가 풍요로워지는 시기입니다. 창의력이 솟아나고 말솜씨가 좋아집니다. 맛있는 것을 먹거나 취미 생활을 즐기기에 완벽합니다.' },
    'Sang-gwan': { name: '상관(傷官)', keywords: ['언변', '반항', '아이디어'], desc: '기존의 틀을 깨고 싶은 욕구가 강해집니다. 톡톡 튀는 아이디어로 주목받지만, 말실수(구설수)를 조심해야 합니다.' },
    'Pyeon-jae': { name: '편재(偏財)', keywords: ['횡재수', '유흥', '큰돈'], desc: '예상치 못한 돈이 들어오거나 나갈 수 있는 시기입니다. 사업적 수완이 좋아지고 유흥을 즐기고 싶어집니다. 로또 한 장 사보세요!' },
    'Jeong-jae': { name: '정재(正財)', keywords: ['성실', '저축', '안정'], desc: '꼼꼼하고 현실적인 판단력이 좋아집니다. 차곡차곡 재물을 모으기에 좋습니다. 계획적인 소비와 투자가 빛을 발합니다.' },
    'Pyeon-gwan': { name: '편관(偏官)', keywords: ['책임', '스트레스', '카리스마'], desc: '책임감이 무거워지고 스트레스를 받을 수 있습니다. 하지만 난관을 극복하면 큰 명예를 얻을 수 있는 시기입니다. 건강 관리에 유의하세요.' },
    'Jeong-gwan': { name: '정관(正官)', keywords: ['승진', '명예', '원칙'], desc: '공명정대하고 바른 생활을 하게 되는 시기입니다. 직장에서능력을 인정받거나 합격운이 따릅니다. 원칙을 지키면 복이 옵니다.' },
    'Pyeon-in': { name: '편인(偏印)', keywords: ['직관', '눈치', '고독'], desc: '눈치가 빨라지고 직관력이 예리해집니다. 남들이 못 보는 것을 보지만, 생각이 너무 많아 우울해질 수도 있습니다. 명상이나 공부가 잘 됩니다.' },
    'Jeong-in': { name: '정인(正印)', keywords: ['인정', '학업', '귀인'], desc: '주변의 도움과 인정을 받는 사랑스러운 시기입니다. 문서운이 좋고 공부나 계약에 유리합니다. 윗사람에게 예쁨을 받습니다.' }
};
const REL_MAP = {
    same: ['Bi-gyeon', 'Geop-jae'],
    output: ['Sik-sin', 'Sang-gwan'],
    control_me: ['Pyeon-gwan', 'Jeong-gwan'],
    i_control: ['Pyeon-jae', 'Jeong-jae'],
    input: ['Pyeon-in', 'Jeong-in']
};
const E = { WOOD: { img: '🌳', c: '#4ade80' }, FIRE: { img: '🔥', c: '#f87171' }, EARTH: { img: '⛰️', c: '#fbbf24' }, METAL: { img: '🔔', c: '#e2e8f0' }, WATER: { img: '🌊', c: '#60a5fa' } };
const EM = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER', '寅': 'WOOD', '卯': 'WOOD', '巳': 'FIRE', '午': 'FIRE', '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH', '申': 'METAL', '酉': 'METAL', '亥': 'WATER', '子': 'WATER' };
const LK = { WOOD: { c: '🌿 그린/민트', i: '식물, 동쪽 산책' }, FIRE: { c: '🔴 레드/퍼플', i: '캔들, 햇빛' }, EARTH: { c: '🟡 옐로우', i: '도자기' }, METAL: { c: '⚪ 화이트/실버', i: '쥬얼리' }, WATER: { c: '🔵 블랙/네이비', i: '물 많이 마시기' } };
const STEM_EL = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER' };
const GENERATING = { WOOD: 'WATER', FIRE: 'WOOD', EARTH: 'FIRE', METAL: 'EARTH', WATER: 'METAL' };
const OVERCOMING = { WOOD: 'METAL', FIRE: 'WATER', EARTH: 'WOOD', METAL: 'FIRE', WATER: 'EARTH' };
const ELEMENT_STEM = { WOOD: '甲', FIRE: '丙', EARTH: '戊', METAL: '庚', WATER: '壬' };
const ELEMENT_COLORS = { WOOD: { bg: '#10b981', t: '#fff' }, FIRE: { bg: '#ef4444', t: '#fff' }, EARTH: { bg: '#eab308', t: '#1f2937' }, METAL: { bg: '#f8fafc', t: '#374151' }, WATER: { bg: '#1e1b4b', t: '#c4b5fd' } };
const ELEMENT_NAMES = { WOOD: '목(木)', FIRE: '화(火)', EARTH: '토(土)', METAL: '금(金)', WATER: '수(水)' };
let uName = '', fType = 'today', curDm = '', curPd = null, curTheme = 'base', gender = 'M', userInput = {};
const trailCanvas = document.getElementById('trailCanvas'), tCtx = trailCanvas.getContext('2d'); let particles = [];
function resizeTrail() { trailCanvas.width = innerWidth; trailCanvas.height = innerHeight } resizeTrail(); addEventListener('resize', resizeTrail);
class Particle { constructor(x, y, b = false) { this.x = x; this.y = y; this.size = b ? Math.random() * 6 + 3 : Math.random() * 4 + 2; this.color = ['#00FFFF', '#E0B0FF', '#FFFFFF'][Math.floor(Math.random() * 3)]; this.alpha = 1; this.decay = b ? .03 : .02; const a = Math.random() * Math.PI * 2, s = b ? Math.random() * 4 + 2 : Math.random() + .5; this.vx = Math.cos(a) * s; this.vy = Math.sin(a) * s } update() { this.x += this.vx; this.y += this.vy; this.alpha -= this.decay; this.size *= .96 } draw() { tCtx.save(); tCtx.globalAlpha = this.alpha; tCtx.fillStyle = this.color; tCtx.shadowBlur = 15; tCtx.shadowColor = this.color; tCtx.beginPath(); tCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2); tCtx.fill(); tCtx.restore() } isAlive() { return this.alpha > 0 } }
function animateTrail() { tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height); particles = particles.filter(p => p.isAlive()); particles.forEach(p => { p.update(); p.draw() }); requestAnimationFrame(animateTrail) } animateTrail();
let lastT = 0; document.addEventListener('mousemove', e => { const n = Date.now(); if (n - lastT > 30) { for (let i = 0; i < 3; i++)particles.push(new Particle(e.clientX, e.clientY)); lastT = n } });
document.addEventListener('touchstart', e => { const t = e.touches[0]; for (let i = 0; i < 15; i++)particles.push(new Particle(t.clientX, t.clientY, true)) });
document.querySelectorAll('.fortune-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.fortune-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); fType = b.dataset.t; updateQuest() });
document.querySelectorAll('.gender-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.gender-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); gender = b.dataset.g });
document.querySelectorAll('.tab-row button').forEach(b => b.onclick = () => { document.querySelectorAll('.tab-row button').forEach(x => x.classList.remove('on')); document.querySelectorAll('.tab-c').forEach(x => x.classList.remove('on')); b.classList.add('on'); document.getElementById('tab-' + b.dataset.tab).classList.add('on') });
document.querySelectorAll('.theme-tabs button').forEach(b => b.onclick = () => { document.querySelectorAll('.theme-tabs button').forEach(x => x.classList.remove('on')); b.classList.add('on'); curTheme = b.dataset.th; updateTheme() });
const yS = document.getElementById('selYear'), mS = document.getElementById('selMonth'), dS = document.getElementById('selDay'), hS = document.getElementById('selHour'), minS = document.getElementById('selMinute');
for (let y = new Date().getFullYear(); y >= 1920; y--)yS.innerHTML += `<option value="${y}">${y}</option>`;
for (let m = 1; m <= 12; m++)mS.innerHTML += `<option value="${m}">${m}월</option>`;
for (let d = 1; d <= 31; d++)dS.innerHTML += `<option value="${d}">${d}</option>`;
for (let h = 1; h <= 12; h++)hS.innerHTML += `<option value="${h}">${h}시</option>`;
for (let m = 0; m < 60; m++)minS.innerHTML += `<option value="${m}">${String(m).padStart(2, '0')}분</option>`;
document.getElementById('unknownTime').onchange = e => { const t = document.getElementById('timeInputs'); t.style.opacity = e.target.checked ? '.4' : '1'; t.style.pointerEvents = e.target.checked ? 'none' : 'auto' };
function updateTheme() { if (!curPd) return; const k = { base: 'base', love: 'love', money: 'money', work: 'work' }; document.getElementById('storyBox').innerHTML = curPd[k[curTheme]] || curPd.base; document.getElementById('adviceTxt').innerHTML = curPd.advice }
const BRANCH_MODIFIERS = {
    '子': { k: '지혜', d: '깊은 지혜를 품었으나, 그 속을 남에게 드러내지 않는구나.', love: '마음은 깊은 바다와 같으나, 표현이 서툴러 오해를 사기 쉽다.', money: '남몰래 재물을 모으는 재주가 있으니, 곳간이 비어있는 것처럼 보여도 실은 든든하리라.', work: '밤에 하는 일, 정신적인 일, 아이디어를 내는 일에 큰 재능을 보인다.' },
    '丑': { k: '성실', d: '황소처럼 묵묵히 제 길을 가니, 그 성실함은 하늘도 알아준다.', love: '한번 마음을 주면 평생을 함께할 반려를 얻는 것과 같다. 다만 재미는 조금 없을 수 있다.', money: '티끌 모아 태산을 이루니, 그 결실이 노년에 크게 빛을 발하리라.', work: '꾸준함이 필요한 일, 신뢰를 바탕으로 하는 일에 적합하다.' },
    '寅': { k: '용맹', d: '산중호랑이의 기세이니, 두려움이 없고 용맹하다.', love: '사랑에 빠지면 앞뒤 재지 않고 돌진하는구나. 그 열정은 아름답지만, 때로는 상대를 지치게 할 수 있다.', money: '큰 것을 노리니, 작은 재물에는 만족하지 못한다. 사업가 기질이 다분하다.', work: '사람들을 이끄는 리더, 새로운 길을 개척하는 선구자의 운명이다.' },
    '卯': { k: '온화', d: '만물이 소생하는 봄의 토끼와 같으니, 다정하고 온화하다.', love: '섬세하고 부드러워 곁에 있으면 마음이 편안해진다. 많은 이성의 사랑을 받는다.', money: '알뜰살뜰 살림을 잘 꾸리니, 재물이 쉽게 새지 않는다.', work: '사람을 상대하는 일, 남을 가르치고 돌보는 일에 하늘이 내린 재능이 있다.' },
    '辰': { k: '변화', d: '변화무쌍한 용의 기운이니, 그 스케일이 남다르다.', love: '꿈같은 사랑을 그리니, 평범한 연애로는 만족하지 못한다.', money: '큰 재물을 꿈꾸니, 투기나 사업에 과감하게 뛰어드는 경향이 있다.', work: '권력을 쥐거나, 큰 조직을 이끄는 지도자의 상이다. 변화를 두려워하지 마라.' },
    '巳': { k: '열정', d: '꺼지지 않는 불꽃의 열정을 품고 있구나.', love: '겉으로는 차가워 보여도, 속은 불덩이처럼 뜨겁다. 한번 사랑에 빠지면 모든 것을 태운다.', money: '정보를 다루는 능력이 뛰어나, 돈의 흐름을 읽는 눈이 있다.', work: '말솜씨가 뛰어나고 설득력이 있으니, 변호사나 외교관, 방송인의 길이 열려있다.' },
    '午': { k: '화려', d: '한낮의 태양처럼 화려하고 주목받는 기운이다.', love: '인기가 많아 주변에 사람이 끊이지 않는다. 화려한 연애를 즐기지만, 진정한 내 사람을 찾기까지 시간이 걸린다.', money: '폼생폼사 기질이 있어 씀씀이가 크지만, 그만큼 버는 능력도 출중하다.', work: '예체능, 연예인 등 남들 앞에 서는 직업에서 크게 성공할 운이다.' },
    '未': { k: '끈기', d: '마른 땅의 끈기를 지녔으니, 인내심이 강하고 속이 깊다.', love: '상대방을 묵묵히 지켜보고 기다려주는 해바라기 같은 사랑을 한다.', money: '안정적인 것을 최고로 치니, 부동산이나 저축으로 부를 쌓는다.', work: '중재자의 역할을 잘하니, 사람들 사이의 갈등을 해결하는 일에 능하다.' },
    '申': { k: '재주', d: '천부적인 재주와 임기응변을 타고났구나.', love: '재치와 유머로 이성의 마음을 쉽게 사로잡는다. 연애 경험이 많을 수 있다.', money: '잔꾀가 많아 돈 버는 재주가 비상하다. 여러 곳에서 재물이 들어온다.', work: '어떤 위기 상황에서도 살아남는 능력이 있으니, 무엇을 해도 밥 굶을 걱정은 없다.' },
    '酉': { k: '결실', d: '가을의 결실과 같이, 예리하고 깔끔한 성품이다.', love: '눈이 높아 아무나 마음에 품지 않는다. 완벽한 상대를 찾지만, 한번 마음을 열면 헌신한다.', money: '한 푼의 낭비도 용납하지 않는 깐깐한 재물 관리자다.', work: '정밀함을 요구하는 전문직, 날카로운 분석력이 필요한 분야가 천직이다.' },
    '戌': { k: '신의', d: '주인을 지키는 충견과 같으니, 의리와 신의가 두텁다.', love: '한번 마음 준 사람은 배신하지 않으니, 이보다 더 든든한 짝은 없으리라.', money: '곳간을 지키는 능력이 탁월하니, 한번 들어온 재물은 절대 잃지 않는다.', work: '책임감이 강해 어떤 임무를 맡겨도 반드시 완수해내는 믿음직한 사람이다.' },
    '亥': { k: '포용', d: '모든 것을 품는 밤의 바다와 같은 기운이다.', love: '상대의 모든 것을 이해하고 감싸주니, 그 마음이 태평양과 같다.', money: '스스로 돈을 좇지 않아도, 먹을 복을 타고나 평생 굶지 않는다.', work: '큰 흐름을 읽는 통찰력이 있으니, 시대를 앞서가는 분야에서 두각을 나타낸다.' }
};
const SEASON_MODIFIERS = {
    '寅': '초봄의', '卯': '봄의', '辰': '늦봄의',
    '巳': '초여름의', '午': '여름의', '未': '늦여름의',
    '申': '초가을의', '酉': '가을의', '戌': '늦가을의',
    '亥': '초겨울의', '子': '겨울의', '丑': '늦겨울의'
};

function getDetailedPersonality(stem, branch, monthBranch) {
    const base = P[stem] || P['甲'];
    const brMod = BRANCH_MODIFIERS[branch] || { k: '', d: '' };
    const season = SEASON_MODIFIERS[monthBranch] || '계절의';
    return {
        summary: `${season} ${brMod.d}`,
        desc: `너는 <strong>${season} 에너지</strong>를 타고난 <strong>${stem}(${ELEMENT_NAMES[EM[stem]]})</strong>일세.<br> ${brMod.d} 성향(${brMod.k})이 더해져, ${base.base.split('.')[0]} 특징이 보이니 참고하게.`
    };
}

function updateQuest() {
    if (!curDm) return;
    const now = new Date();
    let targetStem = '';
    let timeLabel = '';
    const s = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const l = s.getLunar();
    const bz = l.getEightChar();
    if (fType === 'today') {
        targetStem = bz.getDayGan().toString();
        timeLabel = "오늘의 신탁";
    } else if (fType === 'week') {
        targetStem = bz.getMonthGan().toString();
        timeLabel = "이번 주 신탁";
    } else {
        targetStem = bz.getYearGan().toString();
        timeLabel = "올해의 신탁";
    }
    const uEl = STEM_EL[curDm];
    const tEl = STEM_EL[targetStem];
    let relType = '';
    if (uEl === tEl) relType = 'same';
    else if (GENERATING[uEl] === tEl) relType = 'output';
    else if (OVERCOMING[uEl] === tEl) relType = 'i_control';
    else if (OVERCOMING[tEl] === uEl) relType = 'control_me';
    else if (GENERATING[tEl] === uEl) relType = 'input';
    const isYang = (s) => ['甲', '丙', '戊', '庚', '壬'].includes(s);
    const samePol = isYang(curDm) === isYang(targetStem);
    const godKey = REL_MAP[relType][samePol ? 0 : 1];
    const god = TEN_GODS[godKey];
    document.getElementById('questTxt').innerHTML = `<span style="font-size:0.9rem; color:var(--cyan); display:block; margin-bottom:4px;">[${timeLabel}: ${god.name}]</span> ${god.desc}<br> <span style="font-size:0.8rem; color:var(--txt2); margin-top:6px; display:block;">🔑 새겨들을 단어: ${god.keywords.join(', ')}</span>`;
}

function analyze() {
    uName = document.getElementById('userName').value.trim() || '애동';
    let y, mo, d, h, mi;
    const tab = document.querySelector('.tab-row button.on').dataset.tab;
    if (tab === 'quick') {
        const v = document.getElementById('quickDate').value.trim();
        if (!/^\d{8}$/.test(v)) { alert('생년월일 8자를 바르게 입력해야지!'); return }
        y = +v.slice(0, 4); mo = +v.slice(4, 6); d = +v.slice(6, 8);
    } else {
        y = +yS.value; mo = +mS.value; d = +dS.value;
    }
    if (mo < 1 || mo > 12 || d < 1 || d > 31) { alert('날짜가 이상하구나. 다시 보아라.'); return }
    if (document.getElementById('unknownTime').checked) {
        h = 12; mi = 0;
    } else {
        const ap = document.getElementById('selAmpm').value;
        let hh = +hS.value;
        mi = +minS.value;
        if (ap === 'PM' && hh !== 12) hh += 12;
        if (ap === 'AM' && hh === 12) hh = 0;
        h = hh;
    }
    
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    
    setTimeout(() => {
        try {
            if (typeof Solar === 'undefined') throw new Error('Solar library not loaded');
            calc(y, mo, d, h, mi);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            window.scrollTo(0, 0);
        } catch (e) {
            console.error(e);
            document.getElementById('loading').style.display = 'none';
            alert('신령님께서 노하셨다. 잠시 후 다시 시도해 보거라.');
            location.reload();
        }
    }, 1000);
}

function calc(y, mo, d, h, mi) {
    const s = Solar.fromYmdHms(y, mo, d, h, mi, 0), l = s.getLunar(), bz = l.getEightChar();
    const yG = bz.getYearGan().toString(), yZ = bz.getYearZhi().toString();
    const mG = bz.getMonthGan().toString(), mZ = bz.getMonthZhi().toString();
    const dG = bz.getDayGan().toString(), dZ = bz.getDayZhi().toString();
    const tG = bz.getTimeGan().toString(), tZ = bz.getTimeZhi().toString();
    const p = [yG, yZ, mG, mZ, dG, dZ, tG, tZ];
    const cnt = { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
    p.forEach(c => { const e = EM[c]; if (e) cnt[e]++ });
    curDm = dG;
    const basePd = P[curDm] || P['甲'];
    const brMod = BRANCH_MODIFIERS[dZ] || { k: '', d: '', love: '', money: '', work: '' };
    curPd = {
        base: basePd.base + "<br><br>👉 <strong>네 발 밑의 기운 (" + dZ + "):</strong> " + brMod.d,
        love: basePd.love + "<br><br>💖 <strong>애정의 향방:</strong> " + brMod.love,
        money: basePd.money + "<br><br>💰 <strong>재물의 흐름:</strong> " + brMod.money,
        work: basePd.work + "<br><br>💼 <strong>세상살이와 명예:</strong> " + brMod.work,
        advice: basePd.advice
    };
    const pillars = [
        { label: '시주', stem: tG, branch: tZ },
        { label: '일주', stem: dG, branch: dZ },
        { label: '월주', stem: mG, branch: mZ },
        { label: '년주', stem: yG, branch: yZ }
    ];
    let pillarsHTML = '';
    pillars.forEach(pil => {
        const sEl = EM[pil.stem] || 'EARTH', bEl = EM[pil.branch] || 'EARTH';
        const sC = ELEMENT_COLORS[sEl], bC = ELEMENT_COLORS[bEl];
        pillarsHTML += `<div class="pillar"><span class="pillar-label">${pil.label}</span><div class="stem" style="background:${sC.bg};color:${sC.t}">${pil.stem}</div><div class="branch" style="background:${bC.bg};color:${bC.t}">${pil.branch}</div></div>`;
    });
    document.getElementById('pillarsBox').innerHTML = pillarsHTML;
    const detail = getDetailedPersonality(dG, dZ, mZ);
    document.getElementById('sajuMsg').innerHTML = detail.desc;
    const myEl = STEM_EL[curDm] || 'WOOD';
    const bestEl = GENERATING[myEl], worstEl = OVERCOMING[myEl];
    const bestStem = ELEMENT_STEM[bestEl], worstStem = ELEMENT_STEM[worstEl];
    document.getElementById('bestMatch').innerHTML = `${bestStem} 일간 - ${ELEMENT_NAMES[bestEl]}의 기운을 가진 사람`;
    document.getElementById('worstMatch').innerHTML = `${worstStem} 일간 - ${ELEMENT_NAMES[worstEl]}의 기운을 가진 사람`;
    let mn = 9, wk = 'WATER';
    for (const [k, v] of Object.entries(cnt)) if (v < mn) { mn = v; wk = k }
    ['n0', 'n1', 'n2', 'n3'].forEach(id => document.getElementById(id).innerText = uName);
    
    document.querySelector('.hero .sec-title').innerHTML = `✨ <span class="nm" id="n1">${uName}</span>님의 신령님이 점지한 너의 본체`;
    document.getElementById('soulC').innerText = curDm;
    document.getElementById('soulT').innerText = "";
    document.getElementById('genderBadge').innerText = gender === 'M' ? '🙋‍♂️ 남자 (양)' : '🙋‍♀️ 여자 (음)';
    curTheme = 'base';
    document.querySelectorAll('.theme-tabs button').forEach((b, i) => b.classList.toggle('on', i === 0));
    updateTheme();
    
    const statCard = document.getElementById('statChart').parentElement;
    statCard.querySelector('.sec-title').innerHTML = `📜 <span class="nm" id="n2">${uName}</span>님의 신령님이 내려주신 오행 기운`;
    
    const ch = document.getElementById('statChart'); ch.innerHTML = '';
    ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'].forEach(k => {
        const e = E[k], c = cnt[k], pc = (c / 8) * 100;
        ch.innerHTML += `<div class="stat-row"><span class="element-icon">${e.img}</span><div class="stat-track"><div class="stat-fill" style="background:${e.c}" data-w="${pc}%"></div></div><span class="stat-n">${c}</span></div>`;
    });
    setTimeout(() => document.querySelectorAll('.stat-fill').forEach(b => b.style.width = b.dataset.w), 100);
    const lk = LK[wk], le = E[wk];
    const genderTip = gender === 'M' ? '스스로 길을 개척해야 복이 온다' : '주변의 도움을 귀하게 여겨야 복이 온다';
    document.getElementById('luckBox').innerHTML = `<div class="luck-dot" style="background:${le.c};color:${le.c}"></div><div class="luck-info"><strong>${lk.c}</strong><span>${lk.i} | ${genderTip}</span></div>`;
    updateQuest();
    document.getElementById('sajuMbti').innerHTML = `${curDm}`;
    document.getElementById('soulT').innerHTML = ``;
}
function shareKakao() { if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) { alert('카카오 SDK 초기화 필요'); return } Kakao.Share.sendDefault({ objectType: 'feed', content: { title: `[용한점집 달의 신당] ${uName}님에게 신령님이 내린 점괘`, description: `타고난 운명은 [${curDm}]... 과연 그 뜻은?`, imageUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/images/Fire.png', link: { mobileWebUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/', webUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/' } }, buttons: [{ title: '내 점괘 확인하기', link: { mobileWebUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/', webUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/' } }] }) }

window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-down-indicator');
    if (indicator) {
        indicator.style.opacity = '0';
    }
}, { once: true });

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("링크가 복사되었습니다!");
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
        alert("링크 복사에 실패했습니다.");
    });
}
