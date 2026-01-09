import { NextRequest, NextResponse } from "next/server";

const mockTrends = [
  {
    id: 1,
    title: "Stablecoins as Settlement Rails",
    category: "DeFi",
    impact: "high",
    description: "스테이블코인이 전통 금융 시스템의 결제 인프라로 진화",
    opportunities: ["크로스체인 결제", "기업 송금 솔루션", "글로벌 리밋 오더북"],
    sources: ["Coinbase Ventures 2026"],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Onchain Credit Markets",
    category: "DeFi",
    impact: "high",
    description: "온체인 신용 시장과 오프체인 신호의 융합",
    opportunities: ["AI 에이전트 기반 신용 평가", "무담보 대출 풀", "평판 오라클"],
    sources: ["Coinbase Ventures 2026"],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Privacy Infrastructure",
    category: "Infrastructure",
    impact: "medium",
    description: "프라이버시 보호를 위한 인프라 구축",
    opportunities: ["제로지식 증명", "익명 트랜잭션", "데이터 보호 솔루션"],
    sources: ["a16z Crypto 2026"],
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "AI Agents",
    category: "AI",
    impact: "high",
    description: "AI 에이전트가 블록체인과 상호작용하며 자율적으로 작동",
    opportunities: ["자동화된 DeFi 전략", "스마트 계약 관리", "크로스체인 브릿징"],
    sources: ["a16z Crypto 2026", "Coinbase Ventures 2026"],
    createdAt: new Date().toISOString(),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const trend = mockTrends.find((t) => t.id === Number(id));

    if (!trend) {
      return NextResponse.json(
        { error: "트렌드를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(trend);
  } catch (error) {
    return NextResponse.json(
      { error: "트렌드를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
