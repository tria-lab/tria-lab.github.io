type Publication = {
  title: string
  authors: string
  venue: string
  link: string
}

const publications = [
  {
    title: "A Comprehensive Study on Neural Language Models",
    authors: "J. Smith, A. Park, B. Kim",
    venue: "International Conference on Machine Learning (ICML), 2025",
    link: "#",
  },
  {
    title: "Deep Learning Approaches for Natural Language Understanding",
    authors: "J. Doe, C. Lee, D. Choi",
    venue: "Conference on Neural Information Processing Systems (NeurIPS), 2024",
    link: "#",
  },
  {
    title: "Efficient Transformer Models for Resource-Constrained Devices",
    authors: "A. Park, J. Smith",
    venue: "Annual Meeting of the Association for Computational Linguistics (ACL), 2024",
    link: "#",
  },
  {
    title: "Multi-Modal Learning for Visual Question Answering",
    authors: "B. Kim, J. Doe, E. Wilson",
    venue: "Conference on Computer Vision and Pattern Recognition (CVPR), 2023",
    link: "#",
  },
  {
    title: "Advances in Reinforcement Learning from Human Feedback",
    authors: "C. Lee, A. Park, J. Smith",
    venue: "International Conference on Learning Representations (ICLR), 2023",
    link: "#",
  },
  {
    title: "Contextual Embeddings for Low-Resource Languages",
    authors: "D. Choi, B. Kim, J. Doe",
    venue: "Empirical Methods in Natural Language Processing (EMNLP), 2022",
    link: "#",
  },
  {
    title: "A Comprehensive Study on Neural Language Models",
    authors: "J. Smith, A. Park, B. Kim",
    venue: "International Conference on Machine Learning (ICML), 2025",
    link: "#",
  },
  {
    title: "Deep Learning Approaches for Natural Language Understanding",
    authors: "J. Doe, C. Lee, D. Choi",
    venue: "Conference on Neural Information Processing Systems (NeurIPS), 2024",
    link: "#",
  },
  {
    title: "Efficient Transformer Models for Resource-Constrained Devices",
    authors: "A. Park, J. Smith",
    venue: "Annual Meeting of the Association for Computational Linguistics (ACL), 2024",
    link: "#",
  },
  {
    title: "Multi-Modal Learning for Visual Question Answering",
    authors: "B. Kim, J. Doe, E. Wilson",
    venue: "Conference on Computer Vision and Pattern Recognition (CVPR), 2023",
    link: "#",
  },
  {
    title: "Advances in Reinforcement Learning from Human Feedback",
    authors: "C. Lee, A. Park, J. Smith",
    venue: "International Conference on Learning Representations (ICLR), 2023",
    link: "#",
  },
  {
    title: "Contextual Embeddings for Low-Resource Languages",
    authors: "D. Choi, B. Kim, J. Doe",
    venue: "Empirical Methods in Natural Language Processing (EMNLP), 2022",
    link: "#",
  },
] as const satisfies Publication[]

export default function Publications() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Publications</h1>

      <section className="mb-12">
        <div className="space-y-8">
          {publications.map(({ title, authors, link, venue }, index) => (
            <div key={index} className="border-b pb-6">
              <h3 className="mb-2 text-xl font-medium">{title}</h3>
              <p className="mb-2 text-zinc-600">{authors}</p>
              <p className="mb-2 text-sm">{venue}</p>
              <a href={link} className="text-blue-400 hover:underline">
                Paper Link
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
