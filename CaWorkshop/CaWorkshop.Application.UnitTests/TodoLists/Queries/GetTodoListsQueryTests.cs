﻿using AutoMapper;
using CaWorkshop.Application.TodoLists.Queries.GetTodoLists;
using CaWorkshop.Infrastructure.Persistence;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace CaWorkshop.Application.UnitTests.TodoLists.Queries
{
    [Collection(nameof(QueryCollection))]
    public class GetTodoListsQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        // Test Setup
        public GetTodoListsQueryTests(TestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrectVmAndListCount()
        {
            // Arrange
            var query = new GetTodoListsQuery();
            var handler = new GetTodoListsQueryHandler(_context, _mapper);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            result.Should().BeOfType<TodosVm>();
            result.Lists.Should().HaveCount(1);
            result.Lists[0].Items.Should().HaveCount(4);
        }

        // Test Cleanup
        public void Dispose()
        {
            DbContextFactory.Destroy(_context);
        }
    }
}
