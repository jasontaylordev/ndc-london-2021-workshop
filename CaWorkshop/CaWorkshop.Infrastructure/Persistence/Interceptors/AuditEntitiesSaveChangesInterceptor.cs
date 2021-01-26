using CaWorkshop.Application.Common.Interfaces;
using CaWorkshop.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CaWorkshop.Infrastructure.Persistence.Interceptors
{
    public class AuditEntitiesSaveChangesInterceptor
        : SaveChangesInterceptor
    {
        private readonly ICurrentUserService _currentUserService;

        public AuditEntitiesSaveChangesInterceptor(
            ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public override int SavedChanges(
            SaveChangesCompletedEventData eventData,
            int result)
        {
            AuditEntities(eventData.Context);

            return base.SavedChanges(eventData, result);
        }

        public override ValueTask<int> SavedChangesAsync(
            SaveChangesCompletedEventData eventData,
            int result,
            CancellationToken cancellationToken = default)
        {
            AuditEntities(eventData.Context);

            return base.SavedChangesAsync(eventData, result, cancellationToken);
        }

        public void AuditEntities(DbContext context)
        {
            foreach (var entry in context.ChangeTracker.Entries<AuditableEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedBy = _currentUserService.UserId;
                    entry.Entity.CreatedUtc = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Added ||
                    entry.State == EntityState.Modified)
                {
                    entry.Entity.LastModifiedBy = _currentUserService.UserId;
                    entry.Entity.LastModifiedUtc = DateTime.UtcNow;
                }
            }
        }
    }
}
