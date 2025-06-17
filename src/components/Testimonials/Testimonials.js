import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Khalifa',
      role: 'LORDS Towers Resident',
      quote: 'The quality and attention to detail in my LORDS apartment exceeded all expectations. Truly premium living!',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Mohammed',
      role: 'Investor',
      quote: 'Excellent ROI on my LORDS property. Their after-sales service is unmatched in the industry.',
      rating: 4
    },
    {
      id: 3,
      name: 'David Wilson',
      role: 'LORDS Bayview Buyer',
      quote: 'From purchase to handover, the entire process was seamless. Highly recommend LORDS Properties.',
      rating: 5
    }
  ];

  return (
    <section className="testimonials py-5">
      <Container>
        <h2 className="section-title text-center mb-5">What Our Clients Say</h2>
        <Carousel indicators={false} interval={5000}>
          {testimonials.map(testimonial => (
            <Carousel.Item key={testimonial.id}>
              <div className="testimonial-item text-center">
                <div className="rating mb-3">
                  {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                </div>
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Testimonials;