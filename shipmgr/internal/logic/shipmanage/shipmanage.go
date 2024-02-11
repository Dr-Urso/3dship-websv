package shipmanage

import (
	"context"
	"github.com/gogf/gf/v2/database/gdb"
	"github.com/gogf/gf/v2/encoding/gjson"
	"shipmgr/api/part/V1"
	"shipmgr/internal/dao"
	"shipmgr/internal/model"
	"shipmgr/internal/model/do"
	"shipmgr/internal/model/entity"
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
			PartName:    input.Name,
			AnimScript:  input.Script,
			IsSingle:    input.IsSingle,
			Mesh:        input.Mesh,
			StatusIndex: 0,
			ExProp: model.ExtraProp{
				Progress: 0,
				Status:   "",
			},
		}).Insert()
		return err
	})

}

func (s *sShipmanage) AddGroup(ctx context.Context, input model.GroupInput) (err error) {
	m := dao.Parts.Ctx(ctx)
	return m.Transaction(ctx, func(ctx context.Context, tx gdb.TX) error {
		_, err = dao.Group.Ctx(ctx).Data(do.Group{
			Name:      input.Name,
			StartWith: input.StartWith,
		}).Insert()
		return err
	})
}

func (s *sShipmanage) UpdatePart(ctx context.Context, input V1.UpdateReq) (err error) {
	m := dao.Parts.Ctx(ctx)
	return m.Transaction(ctx, func(ctx context.Context, tx gdb.TX) error {
		ins := model.ExtraProp{
			Progress: 0,
			Status:   "",
		}
		res := do.Parts{}
		dao.Parts.Ctx(ctx).Where(do.Parts{Mesh: input.Mesh}).Scan(&res)
		propstr := res.ExProp
		j, _ := gjson.LoadJson(propstr)
		ins.Progress = j.Get("progress").Int()
		ins.Status = j.Get("status").String()
		if input.Progress != 0 {
			ins.Progress = input.Progress
		}
		if input.Status != "" {
			ins.Status = input.Status
		}
		js, _ := gjson.Encode(ins)
		_, err = dao.Parts.Ctx(ctx).Where(do.Parts{Mesh: input.Mesh}).Data(do.Parts{ExProp: js}).Update()
		_, err = dao.Parts.Ctx(ctx).Where(do.Parts{Mesh: input.Mesh}).Increment("statusIndex", 1)
		return err
	})

}

type Entity struct {
	Part *entity.Parts
}

func (s *sShipmanage) ExportUnity(ctx context.Context) (*[]model.PartOutput, error) {
	var Md []Entity
	err := dao.Parts.Ctx(ctx).ScanList(&Md, "Part")
	if err != nil {
		return nil, err
	}

	var out []model.PartOutput
	for _, val := range Md {
		if val.Part == nil {
			continue // 跳过nil值
		}
		out = append(out, model.PartOutput{
			Mesh:        val.Part.Mesh,
			PartName:    val.Part.PartName,
			StatusIndex: int(val.Part.StatusIndex),
			AnimScript:  val.Part.AnimScript,
			ExProp:      val.Part.ExProp,
			IsSingle:    val.Part.IsSingle == 1,
		})
	}
	return &out, nil
}

func (s *sShipmanage) ExportFiltered(ctx context.Context, input V1.FilterReq) (*V1.FilterRes, error) {
	var Md []Entity
	err := dao.Parts.Ctx(ctx).OmitEmpty().Where(do.Parts{Mesh: input.Mesh}).WhereLike("partName", "%%"+input.Name+"%%").ScanList(&Md, "Part")
	if err != nil {
		return &V1.FilterRes{}, err
	}
	var out V1.FilterRes
	for _, val := range Md {
		if val.Part == nil {
			continue // 跳过nil值
		}
		out.Data = append(out.Data, model.PartOutput{
			Mesh:        val.Part.Mesh,
			PartName:    val.Part.PartName,
			StatusIndex: int(val.Part.StatusIndex),
			AnimScript:  val.Part.AnimScript,
			ExProp:      val.Part.ExProp,
			IsSingle:    val.Part.IsSingle == 1,
		})
	}
	return &out, nil
}
