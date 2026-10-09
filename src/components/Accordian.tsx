"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AccordionItem {
  title: string;
  description: string;
  link: string;
}

const Accordion = ({ data }: { data: AccordionItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="tp-service-acordian mb-30">
      <div className="container">
        <div className="row counter-row">
          <div className="col-12">
            <div className="tp-accordion">
              <div className="accordion " id="accordion-310c8f9">
                {data.map((item, index) => (
                  <div
                    className="accordion-item"
                    key={index}
                  >
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          openIndex === index ? "" : "collapsed"
                        }`}
                        style={{ border: "none" }}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={openIndex === index}
                      >
                        {item.title}
                        <span className="accordion-num-count"></span>
                      </button>
                    </h2>

                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="accordion-collapse show overflow-hidden"
                        >
                          <div
                            className="accordion-body"
                            style={{ border: "none", backgroundColor: "white" }}
                          >
                            <p>{item.description}</p>
                            <a
                              style={{
                                fontSize: "18px",
                                color: "#8A5A0D",
                                fontStyle: "italic",
                              }}
                              href={item.link}
                            >
                              Learn more...
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
