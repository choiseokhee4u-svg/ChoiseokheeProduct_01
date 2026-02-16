const KAKAO_API_KEY = '14302bcc718209aaa470793e426fbb2a';
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) Kakao.init(KAKAO_API_KEY);
const P = {
    '甲': {
        base: "하늘을 향해 뻗은 거목(巨木)의 기운을 타고났으니, 그 기세가 하늘을 찌른다. 어디를 가든 우두머리가 되어야 직성이 풀리고, 한번 옳다 생각하면 누구도 그 고집을 꺾지 못하리라. 그 기상으로 능히 큰일을 도모하고 사람들을 이끌지만, 굽힐 줄 모르는 성정 탓에 스스로를 부러뜨릴 수 있으니 경계해야 한다. 새로운 시작의 기운이 강하니, 없던 길을 내고 죽은 것도 살려내는 힘이 있다.",
        love: "애정운에 있어서도 상대를 이끌고 리드해야만 직성이 풀리는구나. 좋으면 좋다, 싫으면 싫다, 화끈하게 표현할 줄 아니 밀고 당기는 재주는 없지만, 한번 내 사람이다 싶으면 온 마음을 다해 아끼고 지켜주리라. 다만, 상대의 말을 귀담아듣지 않고 제 고집대로 하려다 큰 다툼으로 번질 수 있으니, 사랑하는 이의 말에는 귀를 기울여야 한다.",
        money: "재물에 있어서는, 큰돈을 벌어 크게 쓰려는 기질이 있다. 작은 돈을 아끼기보다는 큰돈을 움직여 더 큰 재물을 부르려 하니, 사업가나 투자가의 운명이다. 그 판단이 맞으면 천금도 얻을 것이나, 그릇된 판단은 큰 빚으로 돌아오니 신중해야 한다. 특히 주변의 말에 휘둘리지 않고 독단적으로 결정하다 손해를 볼 수 있다.",
        work: "관운을 보면, 남의 밑에서 일하기는 글렀다. 우두머리 호랑이가 좁은 우리에 갇힌 격이니, 언젠가는 네 스스로 왕이 되어야 한다. 조직에 속해 있더라도 그 안에서 반드시 리더가 되어야 그 능력을 온전히 발휘할 수 있다. 직장 생활보다는 네 사업을 하거나, 높은 자리에 올라야만 편안해질 운명이다.",
        advice: "신령님께서 말씀하시길, '과한 십자가는 네 어깨를 부러뜨릴 뿐이다.' 그 강한 책임감과 고집을 조금만 내려놓고 주위를 둘러보아라. 때로는 굽히는 것이 이기는 것이고, 듣는 것이 길을 여는 열쇠가 될 것이다."
    },
    '乙': {
        base: "바위틈의 들꽃이요, 담장을 휘감는 덩굴의 형상이니, 그 생명력이 실로 대단하다. 어떤 고난과 역경 속에서도 끝까지 살아남아 꽃을 피우는 힘이 있다. 겉으로는 부드럽고 유약해 보이나, 속은 누구보다 강인하다. 눈치가 빨라 상황 판단에 능하고, 강한 자에게는 순응하고 약한 자는 감싸 안을 줄 아는 지혜가 있다.",
        love: "애정운을 보면, 상대의 마음을 귀신같이 읽어내어 그에 맞춰 행동한다. 다정다감하고 헌신적이지만, 때로는 너무 눈치를 보느라 제 속을 다 내보이지 못해 답답함을 사기도 한다. 상처받는 것을 두려워하여 마음을 여는 데 시간이 걸리지만, 한번 마음을 주면 지아비(지어미)밖에 모르는 일편단심이다.",
        money: "재물에 있어서는, 악착같이 모으는 힘이 있다. 화려하게 쓰기보다는 궂은일도 마다하지 않고 돈을 모아 큰 재산을 이루게 된다. 겉으로는 없는 척, 약한 척하지만, 실제로는 재산을 숨겨두고 있는 경우가 많다. 다만, 주변 사람에게 휘둘려 돈을 떼이거나 보증을 잘못 서는 일이 없도록 조심해야 한다.",
        work: "관운을 보면, 어떤 조직에 들어가도 뛰어난 적응력으로 살아남는다. 윗사람에게는 순종하고 아랫사람은 잘 챙기니 평판이 좋다. 다만, 큰 욕심을 내지 않고 현실에 안주하려는 경향이 있어 더 높이 오를 수 있는 기회를 놓치기도 한다. 때로는 과감하게 자신을 드러내고 욕심을 부릴 필요가 있다.",
        advice: "신령님께서 이르시길, '잡초의 생명력은 좋으나, 때로는 거목을 꿈꿔야 큰 그늘을 만들 수 있다.' 주변의 눈치를 살피기보다 너 자신의 목소리를 내어라. 너는 생각보다 훨씬 강하고 가치 있는 사람이다."
    },
    '丙': {
        base: "하늘의 태양과 같으니, 그 빛과 열정이 세상을 밝힌다. 어디를 가나 주변을 환하게 만드는 기운이 있어 사람들이 따른다. 숨기는 것이 없고 솔직담백하며, 예의가 발라 윗사람의 총애를 받는다. 그러나 성정이 불과 같아 급하고 다혈질적인 면이 있어, 한번 화가 나면 물불을 가리지 않는다. 기분 좋은 날은 천사, 화나는 날은 악마가 되니 감정 조절이 중요하다.",
        love: "애정운은 불꽃과 같아, 한번 타오르면 걷잡을 수 없다. 좋아하면 모든 것을 다 내어줄 듯이 뜨겁게 사랑하지만, 그만큼 빨리 식기도 한다. 상대방의 관심과 사랑을 먹고 사는 사람이니, 외롭게 두면 금세 다른 곳으로 눈을 돌릴 수 있다. 화려하고 주목받는 연애를 꿈꾼다.",
        money: "재물을 쓰는 씀씀이가 태양처럼 화끈하다. 버는 족족 주변 사람들에게 베풀고, 유흥이나 취미를 위해 돈을 아끼지 않는다. 돈은 있다가도 없고, 없다가도 생기는 것이라 생각하니, 재물이 쌓일 틈이 없다. 그러나 베푼 만큼 돌아오는 것이 있으니, 크게 굶주리지는 않을 것이다.",
        work: "관운을 보면, 사람들 앞에 나서서 자신을 드러내는 일에 능하다. 예체능이나 방송, 교육, 영업 분야에서 큰 성공을 거둘 수 있다. 리더십이 있고 사람들을 이끄는 힘이 있으나, 꼼꼼하게 뒤를 살피지 못해 실수를 하기도 한다. 혼자 일하기보다는 여러 사람과 함께할 때 더 큰 빛을 발한다.",
        advice: "신령님께서 경고하시길, '태양이 너무 뜨거우면 만물이 타 죽는다.' 너의 그 넘치는 기운을 조금 다스릴 줄 알아야 한다. 한번 내뱉은 말은 주워 담을 수 없으니, 화가 날 때일수록 침묵하는 법을 배워라."
    },
    '丁': {
        base: "밤하늘의 달빛, 어둠을 밝히는 촛불의 형상이니, 겉은 차분하고 속은 따뜻한 외유내강의 표본이다. 그 은은한 빛으로 주변을 살피니, 섬세하고 다정하며 배려심이 깊다. 총명하여 한번 본 것은 잊지 않고, 예술적인 감각이 뛰어나다. 그러나 속으로 한을 품으면 무서운 사람이 되니, 한번 등 돌리면 평생 돌아보지 않을 수 있다.",
        love: "애정운은 헌신적이다. 말없이 상대를 챙기고 희생하지만, 정작 자신의 속마음은 잘 드러내지 않는다. 질투심이 강하고 한번 의심이 시작되면 끝을 모르니, 상대방을 피곤하게 만들 수 있다. 작은 불씨가 큰불로 번지듯, 한번 사랑에 빠지면 모든 것을 다 바쳐 헌신한다.",
        money: "재물에 있어서는 알뜰하고 현실적인 감각이 있다. 불필요한 지출을 삼가고 차곡차곡 재산을 모으는 재주가 있다. 그러나 한번 꽂히는 것이 있으면 돈을 아끼지 않고 쓰기도 한다. 특히, 사람에 대한 투자에는 관대하여, 내 사람이다 싶으면 아낌없이 베푼다.",
        work: "관운을 보면, 묵묵히 자신의 자리에서 빛을 발하는 실력가다. 연구, 교육, 활인 등 전문 분야에서 두각을 나타낸다. 겉으로 나서기보다는 뒤에서 실질적인 힘을 발휘하는 책사나 참모의 역할이 어울린다. 티를 내지 않아 공을 뺏기기 쉬우니, 때로는 자신의 성과를 드러낼 필요가 있다.",
        advice: "신령님께서 이르시길, '촛불은 제 몸을 태워야 빛을 낼 수 있다.' 너의 그 희생정신은 갸륵하나, 자신을 너무 태우지는 마라. 때로는 이기적인 것이 너를 지키는 길이며, 네 안의 어둠도 보듬어주어야 더 밝게 빛날 수 있다."
    },
    '戊': {
        base: "태산(泰山)의 기운을 지녔으니, 그 뚝심과 신의는 천하제일이다. 한번 뱉은 말은 반드시 지키고, 한번 믿은 사람은 끝까지 함께한다. 속이 깊어 웬만한 일에는 흔들리지 않는 바위와 같으니, 주변 사람들이 너를 믿고 의지한다. 그러나 변화를 싫어하고 고집이 황소고집이라, 한번 마음먹은 것은 누구도 바꿀 수 없다. 자기 속을 드러내지 않아 답답하게 보일 수 있다.",
        love: "애정운에 있어서는, 한번 마음을 주면 변치 않는 바위와 같다. 듬직하고 믿음직스러워 기댈 수 있는 상대가 되어주지만, 애정 표현이 서툴고 무뚝뚝하여 상대방을 외롭게 할 수 있다. 연애보다는 결혼에 더 어울리는 사람이다. 안정적인 관계를 추구하며, 의리를 중요하게 생각한다.",
        money: "재물운은 산처럼 묵직하다. 부동산이나 토지와 같은 움직이지 않는 자산으로 큰 부를 이룰 운이다. 투기를 싫어하고, 안정적인 투자를 선호한다. 한번 재물이 들어오면 쉽게 나가지 않으니, 부자가 될 그릇이다. 다만, 새로운 투자 기회를 놓치기 쉬우니, 때로는 과감한 결단이 필요하다.",
        work: "관운은 중재자이자 리더의 운명이다. 신용을 바탕으로 하는 금융, 부동산, 건축 분야나, 사람들을 중재하는 역할에서 능력을 발휘한다. 한 자리에 오래 앉아 뚝심 있게 밀어붙이는 일이 어울린다. 보수적이고 융통성이 부족하여 급변하는 환경에 뒤처질 수 있으니, 새로운 것을 배우는 노력을 게을리해서는 안 된다.",
        advice: "신령님께서 한 말씀 하시길, '움직이지 않는 산은 메아리가 없다.' 너의 그 듬직함도 좋지만, 때로는 마음을 열고 네 속을 내보여라. 세상의 변화에 귀를 기울이고 몸을 움직여야만 더 큰 산이 될 수 있을 것이다."
    },
    '己': {
        base: "만물을 키워내는 비옥한 논밭(田園)의 기운이다. 포용력이 있고 다정다감하여, 누구에게나 어머니와 같은 편안함을 준다. 현실적인 감각이 뛰어나고 생활력이 강하며, 자기 사람을 챙기는 마음이 각별하다. 그러나 내 사람과 아닌 사람을 철저히 구분하며, 한번 마음의 문을 닫으면 냉정하게 돌아선다. 실리를 중요시하여 계산적인 면모도 숨어있다.",
        love: "애정운은 모성애와 같다. 상대를 살뜰히 챙기고 보살피는 것을 기쁨으로 안다. 안정적인 관계를 추구하며, 결혼을 하면 가정을 훌륭하게 이끌어갈 현모양처, 자상한 가장이 될 것이다. 다만, 상대에게 너무 많은 것을 주려다 지치거나, 반대로 상대가 구속으로 느낄 수 있으니 조절이 필요하다.",
        money: "재물운은 꾸준함에 있다. 성실하게 저축하고, 부동산이나 안정적인 자산에 투자하여 차곡차곡 부를 쌓는다. 허황된 꿈을 좇지 않고, 현실적인 계획을 통해 재산을 불려나간다. 때로는 너무 신중하여 큰돈을 벌 기회를 놓치기도 하나, 결코 가난하게 살 팔자는 아니다.",
        work: "관운을 보면, 교육, 복지, 중개, 컨설팅 등 사람을 키우고 연결하는 분야에서 능력을 발휘한다. 어떤 조직에서든 맡은 바를 꼼꼼하게 처리하는 살림꾼 역할을 한다. 드러나지 않게 실속을 챙기는 지혜가 있으나, 큰 판을 주도하기보다는 안정적인 2인자의 자리가 더 어울릴 수 있다.",
        advice: "신령님께서 이르시길, '좋은 밭도 너무 많은 것을 심으면 거두기 힘들다.' 정에 이끌려 모든 것을 다 품으려 하지 마라. 때로는 거절할 줄 아는 용기가 필요하며, 너 자신의 것을 먼저 챙기는 지혜가 필요하다. 너의 밭은 너 스스로를 위해 가꾸어야 가장 아름다운 법이다."
    },
    '庚': {
        base: "제련되지 않은 강철, 무쇠의 기운을 타고났다. 의협심이 강하고 불의를 보면 참지 못하는 여장부, 대장부의 기상이다. 한번 결심하면 뒤도 돌아보지 않고 밀어붙이는 추진력이 대단하다. 그러나 그 기운이 너무 강하여, 날카로운 말로 주변 사람들에게 상처를 주기 쉽다. 강강약약의 표본으로, 강한 자에게는 맞서 싸우고 약한 자는 돕는다.",
        love: "애정운은 단순하고 명쾌하다. 좋으면 좋고, 싫으면 싫다. 밀고 당기는 것을 못 견뎌 하고, 솔직하게 마음을 표현한다. 의리가 있어 내 사람을 지키려는 마음이 강하나, 무뚝뚝하고 거친 표현 때문에 오해를 사기 쉽다. 부드러운 말을 쓰는 연습을 해야 애정 전선에 문제가 없다.",
        money: "재물운은 '모 아니면 도'다. 큰 재물을 한번에 거머쥘 수 있는 힘이 있으나, 그만큼 크게 잃을 수도 있다. 권력이나 명예를 좇다 보면 재물은 저절로 따라오는 운이다. 투자를 하더라도 작은 이익보다는 큰 한방을 노리는 경향이 있다. 결단력이 빨라 기회를 잘 잡지만, 성급한 판단은 금물이다.",
        work: "관운은 군인, 경찰, 검찰 등 권력을 쥐는 직업이나, 강한 카리스마를 필요로 하는 분야에서 빛을 발한다. 조직의 규율을 중요시하지만, 부당한 명령에는 복종하지 않는다. 스스로 조직을 개혁하려는 기질이 강해, 윗사람과 충돌이 잦을 수 있다. 목표 지향적이라 한번 맡은 일은 반드시 성과를 낸다.",
        advice: "신령님께서 경고하시길, '칼은 무고한 사람도 벨 수 있다.' 너의 그 예리한 판단과 직언이 때로는 독이 될 수 있음을 명심해라. 세상을 바꾸는 힘도 위대하지만, 사람의 마음을 얻는 지혜를 먼저 배워야 큰 사람이 될 것이다."
    },
    '辛': {
        base: "아름답게 세공된 보석(寶石)의 기운을 지녔다. 예리하고 섬세하며, 자신만의 완벽한 기준을 가지고 있다. 자존심이 하늘을 찌르고, 스스로가 특별한 존재라고 생각한다. 깔끔하고 세련된 것을 좋아하며, 흐트러진 모습을 용납하지 못한다. 날카로운 분석력과 비판 정신이 뛰어나지만, 이로 인해 주변 사람들을 피곤하게 만들고 스스로도 스트레스를 많이 받는다.",
        love: "애정운은 까다롭기 그지없다. 상대방의 작은 흠도 용납하지 못하며, 자신의 높은 기준에 맞는 사람을 찾아 헤맨다. 연애를 시작하기는 어렵지만, 한번 시작하면 내 사람에게는 완벽한 모습을 보여주려 노력한다. 예민한 감수성 때문에 사소한 말 한마디에 상처받고 마음의 문을 닫아버릴 수 있다.",
        money: "재물운은 보석을 다루듯 정교하다. 가치 있는 것을 알아보는 눈이 있어, 재테크에 소질이 있다. 충동적인 소비를 싫어하고, 계획적으로 돈을 관리한다. 다만, 자신의 품위를 유지하기 위한 지출, 즉 명품이나 사치품에 돈을 쓰는 경향이 있다. 이는 투자가 되기도 하고, 낭비가 되기도 한다.",
        work: "관운은 정밀함을 요구하는 전문직에서 빛을 발한다. 금융, 법률, 의료, 보석 세공, 디자인 등 섬세한 감각과 분석력이 필요한 분야가 제격이다. 완벽주의적인 성향 때문에 결과물의 완성도는 높지만, 과정에서 자신과 타인을 너무 몰아붙이는 경향이 있다. 혼자 하는 일이 더 마음 편할 수 있다.",
        advice: "신령님께서 한 말씀 하시길, '보석도 흙먼지가 묻어야 그 가치가 더 빛나는 법이다.' 너무 깔끔 떨지 마라. 세상의 모든 것이 네 기준에 맞을 수는 없다. 타인의 허물을 탓하기 전에 너 자신의 예민함을 먼저 다스려라. 조금은 둥글게 사는 것이 너를 편안하게 할 것이다."
    },
    '壬': {
        base: "넓고 깊은 바다(大海)의 기운을 타고났으니, 그 속을 알 길이 없다. 지혜가 깊고 생각이 자유로우며, 한곳에 얽매여 사는 것을 답답해한다. 포용력이 넓어 다양한 사람들과 잘 어울리지만, 누구에게도 자신의 진짜 속마음은 내보이지 않는다. 아이디어가 넘치고 창의적이지만, 시작만 하고 마무리를 짓지 못하는 용두사미가 되기 쉽다.",
        love: "애정운은 자유로운 영혼과 같다. 구속과 집착을 싫어하며, 친구처럼 편안한 연애를 추구한다. 이 사람 저 사람에게 친절하여 바람둥이로 오해받기 쉬우나, 정작 마음을 주는 데는 인색하다. 그러나 한번 마음에 품은 사람에게는 한없이 자상하고 로맨틱한 면모를 보여준다.",
        money: "재물운은 파도와 같다. 한번에 큰돈이 들어왔다가, 순식간에 빠져나가기를 반복한다. 스케일이 커서 작은 돈에는 관심이 없고, 큰 흐름을 읽어 투자하려는 경향이 있다. 해외와 관련된 일로 재물을 얻을 수 있다. 지혜를 활용하여 돈을 버는 일에 능하지만, 관리가 소홀하여 모래성처럼 사라질 수 있으니 주의해야 한다.",
        work: "관운은 유랑하는 선비와 같다. 한 직장에 오래 머물기보다는, 여러 분야를 경험하거나 자유로운 환경에서 일하는 것이 어울린다. 해외, 무역, 유통, 기획, 컨설팅 등 변화가 많고 머리를 쓰는 직업에서 능력을 발휘한다. 지혜롭고 위기 대처 능력이 뛰어나지만, 끈기가 부족하여 결실을 보기 전에 포기하는 경우가 많다.",
        advice: "신령님께서 이르시길, '바다는 모든 것을 품지만, 스스로의 깊이를 잃지 않는다.' 이리저리 흘러다니는 것도 좋지만, 너만의 댐을 쌓아 힘을 비축할 때를 알아야 한다. 시작한 일은 끝을 맺는 습관을 들여야, 너의 그 큰 지혜가 비로소 세상의 빛을 보게 될 것이다."
    },
    '癸': {
        base: "만물을 적시는 단비, 아침의 이슬(雨露)과 같은 기운이다. 조용하고 섬세하며, 보이지 않는 곳에서 남을 돕는 인정 많은 사람이다. 상상력이 풍부하고 예술적인 감수성이 뛰어나지만, 현실 감각이 부족하여 뜬구름 잡는 소리를 하기도 한다. 겉으로는 약해 보이나, 한번 마음먹은 것은 끝까지 포기하지 않는 은근한 끈기가 있다. 생각이 너무 많아 우울감에 빠지기 쉬우니 마음 관리가 중요하다.",
        love: "애정운은 순수하고 낭만적이다. 상대방에게 모든 것을 맞춰주는 헌신적인 사랑을 하지만, 그만큼 상처도 쉽게 받는다. 말없이 혼자 상상하고 서운해하다가, 돌아서면 얼음장처럼 차가워지는 면이 있다. 사랑을 시작하기 전에 너무 많은 것을 재고 따지다가 기회를 놓치기 일쑤다.",
        money: "재물운은 '티끌 모아 태산'이다. 큰돈을 벌 욕심보다는, 안정적인 수입을 통해 차곡차곡 모으는 것을 선호한다. 아이디어는 많으나 실천력이 부족하여 돈으로 연결시키지 못하는 경우가 많다. 돈 관리는 꼼꼼하게 잘하지만, 인정에 이끌려 남에게 빌려주고 못 받는 일이 없도록 조심해야 한다.",
        work: "관운은 학자나 예술가의 길을 암시한다. 연구, 교육, 종교, 철학, 예술, 상담 등 정신적인 분야나 활인업에서 능력을 발휘한다. 조직 생활에 잘 적응하지만, 혼자만의 시간을 확보해야 스트레스를 받지 않는다. 뛰어난 아이디어와 통찰력을 가졌으나, 이를 실행에 옮겨줄 조력자가 반드시 필요하다.",
        advice: "신령님께서 말씀하시길, '고인 물은 썩는다.' 너의 그 깊은 생각과 자애로움도 세상에 나와 흘러야 가치가 있다. 머릿속으로만 세상을 구원하지 말고, 작은 것이라도 좋으니 일단 시작하고 행동으로 옮겨라. 그러면 마른 땅을 적시는 단비처럼 귀한 존재가 될 것이다."
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
