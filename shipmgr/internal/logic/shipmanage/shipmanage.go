package shipmanage

import (
	"context"
	"github.com/gogf/gf/v2/database/gdb"
	"shipmgr/internal/dao"
	"shipmgr/internal/model"
	"shipmgr/internal/model/do"
	"shipmgr/internal/service"
)

type sShipmanage struct {
}

func init() {
	service.RegisterShipmanage(New())
}

func New() service.IShipmanage {
	return &sShipmanage{}
}

func (s *sShipmanage) AddPart(ctx context.Context, input model.PartInput) (err error) {
	m := dao.Parts.Ctx(ctx)
	return m.Transaction(ctx, func(ctx context.Context, tx gdb.TX) error {
		_, err = dao.Parts.Ctx(ctx).Data(do.Parts{
			PartName:   input.Name,
			AnimScript: input.Script,
			IsSingle:   input.IsSingle,
		}).Insert()
		return err
	})

}
