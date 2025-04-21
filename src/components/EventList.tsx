const EventList = () => {
  // 추후 API 연동 예정
  return (
    <section id="events" className="py-12 px-4 max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">📅 문화행사</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 예시용 카드 */}
        <div className="border p-4 rounded shadow">행사명</div>
      </div>
    </section>
  );
};

export default EventList;
