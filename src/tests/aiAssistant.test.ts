import { 
  processDocument, 
  askQuestion, 
  generateFlashcards, 
  generateQuiz, 
  getDocuments, 
  removeDocument 
} from '../services/llamaService';

// Mock file for testing
const createMockFile = (name: string, content: string): File => {
  const blob = new Blob([content], { type: 'text/plain' });
  return new File([blob], name, { type: 'text/plain' });
};

describe('Llama LLM Service', () => {
  afterEach(() => {
    // Clear all documents
    const docs = getDocuments();
    docs.forEach(doc => removeDocument(doc.id));
  });

  test('should process a document', async () => {
    const mockFile = createMockFile('test-doc.txt', 'This is a test document');
    const result = await processDocument(mockFile);
    
    expect(result).toBeDefined();
    expect(result.name).toBe('test-doc.txt');
    expect(result.content).toBe('This is a test document');
    expect(result.id).toBe(1);
  });

  test('should ask a question about an uploaded document', async () => {
    // First upload a document
    const mockFile = createMockFile('chemistry.txt', 'This is a document about chemical reactions');
    await processDocument(mockFile);
    
    // Ask a question
    const answer = await askQuestion('explain chemical reactions');
    
    expect(answer).toBeDefined();
    expect(answer.length).toBeGreaterThan(0);
  });

  test('should generate flashcards from a document', async () => {
    // First upload a document
    const mockFile = createMockFile('chemistry.txt', 'This is a document about chemical reactions');
    const doc = await processDocument(mockFile);
    
    // Generate flashcards
    const flashcards = await generateFlashcards(doc.id);
    
    expect(flashcards).toBeDefined();
    expect(flashcards.length).toBeGreaterThan(0);
    expect(flashcards[0]).toHaveProperty('question');
    expect(flashcards[0]).toHaveProperty('answer');
    expect(flashcards[0]).toHaveProperty('topic');
  });

  test('should generate quiz questions from a document', async () => {
    // First upload a document
    const mockFile = createMockFile('math.txt', 'This is a document about calculus');
    const doc = await processDocument(mockFile);
    
    // Generate quiz
    const questions = await generateQuiz(doc.id, 3);
    
    expect(questions).toBeDefined();
    expect(questions.length).toBe(3);
    expect(questions[0]).toHaveProperty('question');
    expect(questions[0]).toHaveProperty('options');
    expect(questions[0]).toHaveProperty('correctAnswer');
    expect(questions[0]).toHaveProperty('explanation');
  });
}); 