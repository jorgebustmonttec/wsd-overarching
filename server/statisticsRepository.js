const statistics = { visitCount: 0 };

const getVisitCount = () => statistics.visitCount;

const incrementVisitCount = () => {
  statistics.visitCount++;
};

export { getVisitCount, incrementVisitCount };