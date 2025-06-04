import React from "react";
import styled from "styled-components";

import HeroBanner from "../utils/Images/heroBanner.png";
import eveningDress from "../utils/Images/eveningDress.png";
import casualDress from "../utils/Images/casualDress.png";
import accessories from "../utils/Images/accessories.png";

import bestseller1 from "../utils/Images/bestseller1.png";
import bestseller2 from "../utils/Images/bestseller2.png";
import bestseller3 from "../utils/Images/bestseller3.png";

const Container = styled.div`
  padding: 24px 32px 160px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 64px;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 768px) {
    padding: 20px 14px 120px;
    gap: 48px;
  }
`;

const Section = styled.section`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 24px;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 420px;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 0 24px;
`;

const Headline = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 12px;
  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const SubText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 28px;
`;

const CTAButton = styled.button`
  padding: 12px 32px;
  background: ${({ theme }) => theme.primary || "#e91e63"};
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.25s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 18px;
  }
`;

const CategoryCard = styled.div`
  position: relative;
  width: 260px;
  height: 340px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 500px) {
    width: 46%;
    height: 260px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryLabel = styled.span`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.3px;
`;
const ProductCard = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 18px;
  background: ${({ theme }) => theme.cardBg || "#fff"};
  padding: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
  }
  img {
    width: 100%;
    height: 320px;
    object-fit: cover;
    border-radius: 14px;
  }
  p {
    font-weight: 500;
    letter-spacing: 0.3px;
  }
  @media (max-width: 500px) {
    width: 46%;
    img {
      height: 240px;
    }
  }
`;
const TestimonialCard = styled.div`
  flex: 1 1 28%;
  padding: 24px;
  background: ${({ theme }) => theme.cardBg || "#fff"};
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-size: 1rem;
  line-height: 1.55;
  position: relative;
  &:before {
    content: "“";
    position: absolute;
    font-size: 3rem;
    top: -18px;
    left: 18px;
    color: ${({ theme }) => theme.primary || "#e91e63"};
    opacity: 0.15;
  }
  span {
    display: block;
    margin-top: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.primary || "#e91e63"};
  }
`;
const Home = () => {
  return (
    <Container>
      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <Section>
        <Banner>
          <BannerImg src={HeroBanner} alt="Fashion banner" />
          <BannerOverlay>
            <Headline>Elevate Your Style</Headline>
            <SubText>Discover trend-setting dresses for every occasion</SubText>
            <CTAButton>Shop Now</CTAButton>
          </BannerOverlay>
        </Banner>
      </Section>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <Section>
        <Title center>Shop by Categories</Title>
        <CardGrid>
          <CategoryCard>
            <img src={eveningDress} alt="Evening Dresses" />
            <CategoryLabel>Evening&nbsp;Dresses</CategoryLabel>
          </CategoryCard>
          <CategoryCard>
            <img src={casualDress} alt="Casual Dresses" />
            <CategoryLabel>Casual&nbsp;Dresses</CategoryLabel>
          </CategoryCard>
          <CategoryCard>
            <img src={accessories} alt="Accessories" />
            <CategoryLabel>Accessories</CategoryLabel>
          </CategoryCard>
        </CardGrid>
      </Section>

      {/* ── BESTSELLERS ───────────────────────────────────────────── */}
      <Section>
        <Title center>Best Sellers</Title>
        <CardGrid>
          <ProductCard>
            <img src={bestseller1} alt="Floral Maxi Dress" />
            <p>Floral Maxi Dress</p>
          </ProductCard>
          <ProductCard>
            <img src={bestseller2} alt="Silky Cocktail Dress" />
            <p>Silky Cocktail Dress</p>
          </ProductCard>
          <ProductCard>
            <img src={bestseller3} alt="Classic Accessories Set" />
            <p>Classic Accessories Set</p>
          </ProductCard>
        </CardGrid>
      </Section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <Section>
        <Title center>What Our Customers Say</Title>
        <CardGrid>
          <TestimonialCard>
            I found the perfect outfit for my sister's wedding and got
            compliments all night!
            <span>- Anisha</span>
          </TestimonialCard>
          <TestimonialCard>
            Beautiful fabrics and fast delivery. This shop is now my go-to.
            <span>- Aenee</span>
          </TestimonialCard>
          <TestimonialCard>
            High-quality products and super friendly support. Highly recommend!
            <span>- Simran</span>
          </TestimonialCard>
          <TestimonialCard>
            Wonderful Team, High-quality products. Highly recommend!
            <span>- Rupinder</span>
          </TestimonialCard>
        </CardGrid>
      </Section>
    </Container>
  );
};

export default Home;
