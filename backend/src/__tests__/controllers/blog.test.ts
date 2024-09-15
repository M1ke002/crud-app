import { Request, Response } from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
} from "../../controllers/blog";
import { Blog } from "../../models";

//mocks the Blog model class
jest.mock("../../models");

describe("getAllBlogs", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of blogs with status 200", async () => {
    const mockBlogs = [
      { id: 1, title: "blog title 1", content: "blog 1 content" },
      { id: 2, title: "blog title 2", content: "blog 2 content" },
    ];
    (Blog.findAll as jest.Mock).mockResolvedValue(mockBlogs);

    await getAllBlogs(mockReq as Request, mockRes as Response);

    expect(Blog.findAll).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockBlogs);
  });

  it("should return error status 500 if something is wrong", async () => {
    (Blog.findAll as jest.Mock).mockRejectedValue(new Error("Internal Error"));

    await getAllBlogs(mockReq as Request, mockRes as Response);

    expect(Blog.findAll).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("getBlog", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = { params: { id: "1" } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 404 if blog is not found", async () => {
    (Blog.findByPk as jest.Mock).mockResolvedValue(null);

    await getBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it("should return a blog object with status 200 if blog is found", async () => {
    const testBlog = { title: "test blog", content: "test content" };
    (Blog.findByPk as jest.Mock).mockResolvedValue(testBlog);

    await getBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(testBlog);
  });

  it("should return error status 500 if something is wrong", async () => {
    (Blog.findByPk as jest.Mock).mockRejectedValue(new Error("Internal Error"));

    await getBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("createBlog", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 400 if blog title is missing", async () => {
    mockReq.body = { content: "test content" };
    await createBlog(mockReq as Request, mockRes as Response);

    expect(Blog.create).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("should return the blog object with status 200 if blog is created successfully", async () => {
    const testBlog = { id: 1, title: "test blog", content: "test content" };
    mockReq.body = { title: "test title", content: "test content" };

    (Blog.create as jest.Mock).mockResolvedValue(testBlog);

    await createBlog(mockReq as Request, mockRes as Response);

    expect(Blog.create).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(testBlog);
  });

  it("should return error status 500 if something is wrong", async () => {
    mockReq.body = { title: "test title", content: "test content" };
    (Blog.create as jest.Mock).mockRejectedValue(new Error("Internal Error"));

    await createBlog(mockReq as Request, mockRes as Response);

    expect(Blog.create).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("editBlog", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = { params: { id: "1" }, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 400 if blog title is missing", async () => {
    mockReq.body = { content: "test content" };
    await editBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("should return status 404 if blog is not found", async () => {
    mockReq.body = { title: "test title", content: "test content" };
    (Blog.findByPk as jest.Mock).mockResolvedValue(null);

    await editBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it("should return the updated blog object with status 200 if blog is found", async () => {
    const testBlog = {
      id: 1,
      title: "old title",
      content: "old content",
      save: jest.fn(),
    };
    mockReq.body = { title: "new title", content: "new content" };

    (Blog.findByPk as jest.Mock).mockResolvedValue(testBlog);

    await editBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(testBlog.save).toHaveBeenCalledTimes(1);
    expect(testBlog.title).toBe("new title");
    expect(testBlog.content).toBe("new content");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(testBlog);
  });

  it("should return error status 500 if something is wrong", async () => {
    mockReq.body = { title: "new title", content: "new content" };
    (Blog.findByPk as jest.Mock).mockRejectedValue(new Error("Internal Error"));

    await editBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("deleteBlog", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    (mockReq = { params: { id: "1" } }),
      (mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 404 if blog is not found", async () => {
    (Blog.findByPk as jest.Mock).mockResolvedValue(null);

    await deleteBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it("should return 200 if blog is deleted successfully", async () => {
    const testBlog = {
      id: 1,
      title: "test title",
      content: "test content",
      destroy: jest.fn(),
    };
    (Blog.findByPk as jest.Mock).mockResolvedValue(testBlog);

    await deleteBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(testBlog.destroy).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("should return error status 500 if something is wrong", async () => {
    (Blog.findByPk as jest.Mock).mockRejectedValue(new Error("Internal Error"));

    await deleteBlog(mockReq as Request, mockRes as Response);

    expect(Blog.findByPk).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
